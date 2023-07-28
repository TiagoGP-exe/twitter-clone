"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { createContext, FC, useContext, useEffect, useState } from "react";

interface UserContext {
  user?: User;
  isLoading: boolean;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContext | null>(null);

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const supabase = createClientComponentClient<Database>();
  const [user, setUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setIsLoading(true);
        const currentUser = session?.user;

        setUser(currentUser);
        setIsLoading(false);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useCurrency must be used with CurrencyProvider");
  }

  return context;
};
