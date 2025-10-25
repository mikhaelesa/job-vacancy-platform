"use client";

import { supabaseClient } from "@/src/constants/supabaseClient.constant";
import { Session, User } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface IAuthContext {
  user: User | null;
  isLoading: boolean;
  session: Session | null;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  isLoading: true,
  session: null,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      setSession(data.session || null);
      setUser(data.session?.user || null);
      setIsLoading(false);
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
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
