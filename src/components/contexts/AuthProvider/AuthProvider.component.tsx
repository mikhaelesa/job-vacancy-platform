"use client";

import { supabaseClient } from "@/src/constants/supabaseClient.constant";
import { User } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface IAuthContext {
  user: User | null;
}

const AuthContext = createContext<IAuthContext>({ user: null });

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    const { data } = supabaseClient.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
