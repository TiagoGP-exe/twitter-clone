"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useUser } from "../hooks/useUser";

interface ButtonLoginProps {
  isLogged?: boolean;
}

export const ButtonLogin: FC<ButtonLoginProps> = () => {
  const { user, isLoading } = useUser();
  const supabase = createClientComponentClient<Database>();
  const { refresh } = useRouter();

  const handleSignIn = async () =>
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });

  const handleSignOut = async () => {
    await supabase.auth.signOut();

    refresh();
  };

  if (isLoading) {
    return null;
  }

  return user ? (
    <button
      className=" p-2 active:scale-95 transition-all text-sm text-gray-700 hover:text-white "
      onClick={handleSignOut}
    >
      SignOut
    </button>
  ) : (
    <button
      className=" p-2 active:scale-95 transition-all text-sm text-gray-700 hover:text-white "
      onClick={handleSignIn}
    >
      Login
    </button>
  );
};
