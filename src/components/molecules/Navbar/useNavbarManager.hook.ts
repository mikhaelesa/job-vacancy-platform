import { PATHS } from "@/src/constants/paths.constant";
import { SEARCH_PARAMS } from "@/src/constants/searchParams.constant";
import { supabaseClient } from "@/src/constants/supabaseClient.constant";
import { USER_ROLE } from "@/src/constants/userRole.constant";
import useAuth from "@/src/hooks/useAuth.hook";
import { useParamsManager } from "@/src/hooks/useParamsManager.hook";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

const useNavbarManager = () => {
  const queryClient = useQueryClient();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const paramsManager = useParamsManager();
  const isRecruiter = auth.role === USER_ROLE.recruiter;
  const isInRecruiterDashboard = pathname.startsWith("/admin");

  const getLoginHandler = () =>
    paramsManager.appendParams({ [SEARCH_PARAMS.login]: "true" });

  const getLogoutHandler = async () => {
    router.replace(PATHS.root);
    queryClient.clear();
    await supabaseClient.auth.signOut();
  };

  return {
    getLoginHandler,
    getLogoutHandler,
    isRecruiter,
    isInRecruiterDashboard,
    auth,
  };
};

export default useNavbarManager;
