import NextAuth from "next-auth";
import { z } from "zod";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import facebook from "next-auth/providers/facebook";
import { postFetch } from "./app/utils/api-helpers";
import type { User, NextAuthConfig, Session } from "next-auth";
import type { Provider } from "next-auth/providers";
import type { JWT } from "next-auth/jwt";
import type { TUserData } from "./app/(application)/definitions";
import { authenticateFB, authenticateGO } from "./app/(authentication)/actions";
import { redirect } from "next/navigation";

type CustomUser =
  | (User &
      Pick<
        TUserData["profile"],
        "phone" | "dateOfBirth" | "lastName" | "nationality"
      >)
  | null;

declare module "next-auth" {
  interface Session {
    user: CustomUser;
  }
  interface User {
    id?: string;
    name?: string | null;
    image?: string | null;
    email?: string | null;
    lastName: string | null;
    phone: string;
    dateOfBirth: string;
    nationality: string;
    accessToken: string;
    signedInWith: string;
    profilePicture: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    lastName: string;
    phone: string;
    profilePicture: string;
    dateOfBirth: string;
    nationality: string;
    accessToken: string;
    signedInWith: string;
  }
}

async function getUserFromDb(email: string, password: string) {
  try {
    const userData = await postFetch<TUserData | Error>("/Auth/access-token", {
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
        const user = (await getUserFromDb(email, password)) as TUserData;
        if (user?.accessToken) {
          return {
            accessToken: user.accessToken,
            signedInWith: user.signedInWith,
            id: user.profile.id.toString(),
            name: user.profile.firstName,
            lastName: user.profile.lastName,
            phone: user.profile.phone,
            email: user.profile.email,
            image: user.profile.image,
            dateOfBirth: user.profile.dateOfBirth,
            nationality: user.profile.nationality,
            profilePicture: user.profile.profilePicture,
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
    error: "/access-denied",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProfile = nextUrl.pathname.startsWith("/profile");
      if (isOnProfile) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const googleUser = await authenticateGO(
          account.id_token,
          account.access_token,
        );
        if (typeof googleUser !== "string") {
          const userData = googleUser!;
          user.id = userData.profile.id.toString();
          user.lastName = userData.profile.lastName;
          user.phone = userData.profile.phone;
          user.dateOfBirth = userData.profile.dateOfBirth;
          user.nationality = userData.profile.nationality;
          user.accessToken = userData.accessToken;
          user.profilePicture = userData.profile.profilePicture;
          user.signedInWith = userData.signedInWith;
        } else {
          redirect("/signin");
        }
      } else if (account?.provider === "facebook") {
        const facebookUser = await authenticateFB(account.access_token);
        if (typeof facebookUser !== "string") {
          const userData = facebookUser!;
          user.id = userData.profile.id.toString();
          user.lastName = userData.profile.lastName;
          user.phone = userData.profile.phone;
          user.dateOfBirth = userData.profile.dateOfBirth;
          user.nationality = userData.profile.nationality;
          user.accessToken = userData.accessToken;
          user.profilePicture = userData.profile.profilePicture;
          user.signedInWith = userData.signedInWith;
        } else {
          redirect("/signin");
        }
      }
      return true;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token) {
        session.user.id = token.id;
        session.user.lastName = token.lastName;
        session.user.phone = token.phone;
        session.user.dateOfBirth = token.dateOfBirth;
        session.user.nationality = token.nationality;
        session.user.accessToken = token.accessToken;
        session.user.signedInWith = token.signedInWith;
        session.user.profilePicture = token.profilePicture;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user && token) {
        token.id = user.id!;
        token.lastName = user.lastName!;
        token.phone = user.phone!;
        token.dateOfBirth = user.dateOfBirth!;
        token.accessToken = user.accessToken!;
        token.signedInWith = user.signedInWith!;
        token.profilePicture = user.profilePicture!;
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
