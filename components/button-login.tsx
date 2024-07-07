"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useUser } from "../hooks/useUser";
import { Github } from 'lucide-react';

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
      className=" p-2 active:scale-95 transition-all text-sm text-foreground/50 hover:text-foreground "
      onClick={handleSignOut}
    >
      SignOut
    </button>
  ) : (
    <button
      className="flex p-2 active:translate-y-0.5 transition-all max-w-sm w-11/12 justify-center text-foreground border border-foreground/30 rounded-md items-center text-xl font-semibold hover:bg-foreground hover:text-background"
      onClick={handleSignIn}
    >
      <Github size={20} strokeWidth={2} /> Github
    </button>
  );
};
