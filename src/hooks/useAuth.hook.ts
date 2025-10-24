import { AuthContext } from "@/src/components/contexts/AuthProvider";
import { useContext } from "react";

const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("useAuth must be used within AuthProvider");

  return authContext;
};

export default useAuth;
