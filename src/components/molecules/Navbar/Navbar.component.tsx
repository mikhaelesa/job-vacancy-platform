import Avatar from "@/src/components/atoms/Avatar";
import Button from "@/src/components/atoms/Button";
import IcChevronDown from "@/src/components/atoms/Icons/IcChevronDown.component";
import { PATHS } from "@/src/constants/paths.constant";
import { SEARCH_PARAMS } from "@/src/constants/searchParams.constant";
import { supabaseClient } from "@/src/constants/supabaseClient.constant";
import { USER_ROLE } from "@/src/constants/userRole.constant";
import useAuth from "@/src/hooks/useAuth.hook";
import { useParamsManager } from "@/src/hooks/useParamsManager.hook";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Dropdown from "../Dropdown";

const Navbar = () => {
  const auth = useAuth();
  const router = useRouter();
  const paramsManager = useParamsManager();

  const isRecruiter = auth.role === USER_ROLE.recruiter;

  const handleLogin = () =>
    paramsManager.appendParams({ [SEARCH_PARAMS.login]: "true" });

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    router.replace(PATHS.root);
  };

  return (
    <header>
      <nav className="flex justify-between items-center py-4.5 pl-5 pr-6">
        <span className="text-xl font-bold">Job List</span>
        <div className="flex items-center gap-x-4">
          {auth.user && (
            <Dropdown className="relative">
              <Dropdown.Head>
                {({ onToggleDropdown }) => (
                  <button
                    type="button"
                    className="cursor-pointer flex items-center gap-x-2"
                    onClick={onToggleDropdown}
                  >
                    <Avatar />
                    <IcChevronDown />
                  </button>
                )}
              </Dropdown.Head>
              <Dropdown.Body>
                <div className="absolute w-[200px] top-10 right-0 rounded-lg bg-neutral-10 shadow-modal overflow-hidden flex flex-col z-20">
                  <Dropdown.Item>
                    {() => (
                      <button
                        type="button"
                        className="p-2 cursor-pointer w-full hover:bg-primary-hover hover:text-neutral-10"
                        onClick={handleLogout}
                      >
                        <p className="text-m text-left">Logout</p>
                      </button>
                    )}
                  </Dropdown.Item>
                  {isRecruiter && (
                    <Dropdown.Item>
                      {() => (
                        <Link
                          href={PATHS.adminJobs}
                          className="p-2 cursor-pointer w-full hover:bg-primary-hover hover:text-neutral-10 text-m"
                        >
                          Recruiter Dashboard
                        </Link>
                      )}
                    </Dropdown.Item>
                  )}
                </div>
              </Dropdown.Body>
            </Dropdown>
          )}
          {!auth.user && <Button onClick={handleLogin}>Login</Button>}
        </div>
      </nav>
      <div className="border border-neutral-40" />
    </header>
  );
};

export default Navbar;
