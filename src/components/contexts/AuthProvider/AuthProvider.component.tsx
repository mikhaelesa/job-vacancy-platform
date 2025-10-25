"use client";

import { supabaseClient } from "@/src/constants/supabaseClient.constant";
import { USER_ROLE } from "@/src/constants/userRole.constant";
import { Session, User } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface IAuthContext {
  user: User | null;
  isLoading: boolean;
  session: Session | null;
  role: keyof typeof USER_ROLE | null;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  isLoading: true,
  session: null,
  role: null,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<keyof typeof USER_ROLE | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      setSession(data.session || null);
      setUser(data.session?.user || null);
      setRole(data.session?.user.user_metadata.role);
      setIsLoading(false);
    });

    const { data } = supabaseClient.auth.onAuthStateChange((_, session) => {
      setSession(session || null);
      setUser(session?.user || null);
      setRole(session?.user.user_metadata.role);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
