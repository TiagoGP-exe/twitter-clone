"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const ButtonLogin = () => {
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: "http://localhost:3000/auth/callback" },
    });

    if (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => await supabase.auth.signOut();

  return <button onClick={handleSignIn}>Login</button>;
};
