import NextAuth from "next-auth";
import { z } from "zod";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import facebook from "next-auth/providers/facebook";
import { postFetch } from "./app/utils/api-helpers";
import type { User, NextAuthConfig, Session } from "next-auth";
import type { Provider } from "next-auth/providers";
import type { JWT } from "next-auth/jwt";
import type { UserData } from "./app/(application)/definitions";
import { authenticateGO } from "./app/(authentication)/actions";

type CustomUser =
  | (User & Pick<UserData["profile"], "phone" | "dateOfBirth" | "lastName">)
  | null;

declare module "next-auth" {
  interface Session {
    user: CustomUser;
  }
  interface User {
    id?: string;
    name?: string | null;
    lastName?: string | null;
    phone?: string;
    email?: string | null;
    dateOfBirth?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
  }
}

async function getUserFromDb(email: string, password: string) {
  try {
    const userData = await postFetch<UserData | Error>("/Auth/access-token", {
      email,
      password,
    });
    return userData;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user");
  }
}

const providers: Provider[] = [
  Google,
  facebook,
  Credentials({
    name: "credentials",
    credentials: {
      email: {},
      password: {},
    },

    authorize: async (credentials): Promise<CustomUser> => {
      const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(8) })
        .safeParse(credentials);

      if (parsedCredentials.success) {
        const { email, password } = parsedCredentials.data;
        const user = (await getUserFromDb(email, password)) as UserData;
        if (user?.accessToken) {
          return {
            id: user.profile.id.toString(),
            name: user.profile.firstName,
            lastName: user.profile.lastName,
            phone: user.profile.phone,
            email: user.profile.email,
            dateOfBirth: user.profile.dateOfBirth,
          };
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

const authOptions: NextAuthConfig = {
  //TODO: add when needed
  // debug: process.env.NODE_ENV !== "production" ? true : false,
  providers,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === "google") {
        await authenticateGO(account.id_token, account.access_token);
      }
      return true;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token) {
        session.user.id = token.id;
        session.user.lastName = token.lastName;
        session.user.phone = token.phone;
        session.user.dateOfBirth = token.dateOfBirth;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user && token) {
        token.id = user.id!;
        token.lastName = user.lastName!;
        token.phone = user.phone!;
        token.dateOfBirth = user.dateOfBirth!;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
