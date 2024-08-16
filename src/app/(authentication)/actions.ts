"use server";

import { AuthError } from "next-auth";
import { getFetch, postFetch } from "~/app/utils/api-helpers";
import { signIn, signOut } from "~/auth";
import { capitalize } from "../utils/helpers";
import { redirect } from "next/navigation";
import { FetchError } from "../utils/definitions";
import type { TUserData } from "../(application)/definitions";

export async function authenticateCR(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function authenticateGO(
  idToken: string | undefined,
  accessToken: string | undefined,
) {
  try {
    if (idToken && accessToken) {
      const res = await postFetch<TUserData>("/Auth/google-login", {
        idToken: idToken,
        accessToken: accessToken,
      });
      if (res instanceof FetchError) {
        throw res;
      }
      return res;
    } else {
      return "User not found";
    }
  } catch (error) {
    console.error("Failed to login user via Google:", error);
    return "Failed to login user via Google, please try another method.";
  }
}

export async function authenticateFB(accessToken: string | undefined) {
  try {
    const res = await postFetch<TUserData>("/Auth/facebook-login", {
      accessToken: accessToken,
    });
    if (res instanceof FetchError) {
      throw res;
    }
    return res;
  } catch (error) {
    console.error("Failed to login user via Facebook:", error);
    return "Failed to login user via Facebook, please try another method.";
  }
}

export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const res = await postFetch("/Users/register", {
      firstName: capitalize(formData.get("firstName") as string),
      lastName: capitalize(formData.get("lastName") as string),
      number: formData.get("phone") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
    if (res instanceof FetchError) {
      throw res;
    }
  } catch (error) {
    if (error instanceof FetchError) {
      return `${error.message}`;
    } else {
      return "Failed to register user";
    }
  }
  redirect("/account-verification");
}

export async function verifyAccount(
  prevState: string | undefined,
  { code }: { code: string },
) {
  try {
    const res = await postFetch("/Users/activate", { code: code });
    if (res instanceof FetchError) {
      throw res;
    }
  } catch (error) {
    if (error instanceof FetchError) {
      return `${error.message}`;
    } else {
      return "Failed to activate user";
    }
  }
  redirect("/signin");
}

export async function resetPassOTP(
  prevState: string | undefined,
  { code, email }: { code: string; email: string },
) {
  try {
    const res = await postFetch("/Users/verify-reset-password", {
      resetCode: code,
      email: email,
    });
    if (res instanceof FetchError) {
      throw res;
    }
  } catch (error) {
    if (error instanceof FetchError) {
      return `${error.message}`;
    } else {
      return "Failed to validate OTP";
    }
  }
  redirect("/set-new-password");
}

export async function resetPassViaEmail(
  prevState: string | undefined,
  { email }: { email: string },
) {
  try {
    const res = await postFetch("/Users/forgot-password", { email: email });
    if (res instanceof FetchError) {
      throw res;
    }
  } catch (error) {
    if (error instanceof FetchError) {
      return `${error.message}`;
    } else {
      return "Failed to find user";
    }
  }
  redirect("/password-reset");
}

export async function setNewPassword(
  prevState: string | undefined,
  {
    email,
    resetCode,
    newPassword,
  }: { email: string; resetCode: string; newPassword: string },
) {
  try {
    const res = await postFetch("/Users/reset-password", {
      email,
      resetCode,
      newPassword,
    });
    if (res instanceof FetchError) {
      throw res;
    }
  } catch (error) {
    if (error instanceof FetchError) {
      return `${error.message}`;
    } else {
      return "Failed to find user";
    }
  }
  redirect("/signin");
}

export async function resendOtp(
  prevState: string | undefined,
  email: string | undefined,
) {
  try {
    const res = await postFetch("/Users/resend", { email: email });
    if (res instanceof FetchError) {
      throw res;
    }
  } catch (error) {
    if (error instanceof FetchError) {
      return `${error.message}`;
    } else {
      return "Failed to activate user";
    }
  }
}

export async function logOut() {
  try {
    await Promise.all([
      getFetch("/Auth/logout", true),
      signOut({ redirectTo: "/" }),
    ]);
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("AuthError: ", error);
    }
    throw error;
  }
}
