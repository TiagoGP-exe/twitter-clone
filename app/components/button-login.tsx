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
      options: { redirectTo: "http://localhost:3000/auth/callback" },
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
      className="w-20 p-2 rounded bg-red-600 active:scale-95 transition-all text-white text-sm "
      onClick={handleSignOut}
    >
      SignOut
    </button>
  ) : (
    <button
      className="w-20 p-2 rounded-lg bg-blue-600 active:scale-95 transition-all text-white text-sm"
      onClick={handleSignIn}
    >
      Login
    </button>
  );
};
