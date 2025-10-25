import Avatar from "@/src/components/atoms/Avatar";
import { SEARCH_PARAMS } from "@/src/constants/searchParams.constant";
import { supabaseClient } from "@/src/constants/supabaseClient.constant";
import useAuth from "@/src/hooks/useAuth.hook";
import { useParamsManager } from "@/src/hooks/useParamsManager.hook";
import Button from "../../atoms/Button";
import IcChevronDown from "../../atoms/Icons/IcChevronDown.component";
import Dropdown from "../Dropdown";

const Navbar = () => {
  const auth = useAuth();
  const paramsManager = useParamsManager();

  const handleLogin = () =>
    paramsManager.appendParams({ [SEARCH_PARAMS.login]: "true" });

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
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
                <div className="absolute w-[200px] top-10 right-0 rounded-lg bg-neutral-10 shadow-modal overflow-hidden">
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
                  <Dropdown.Item>
                    {() => (
                      <button
                        type="button"
                        className="p-2 cursor-pointer w-full hover:bg-primary-hover hover:text-neutral-10"
                      >
                        <p className="text-m text-left">Recruiter Dashboard</p>
                      </button>
                    )}
                  </Dropdown.Item>
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
