import Avatar from "@/src/components/atoms/Avatar";
import Button from "@/src/components/atoms/Button";
import IcChevronDown from "@/src/components/atoms/Icons/IcChevronDown.component";
import { PATHS } from "@/src/constants/paths.constant";
import Link from "next/link";
import Dropdown from "../Dropdown";
import useNavbarManager from "./useNavbarManager.hook";

interface INavbarProps {
  title?: string;
}

const Navbar = ({ title }: INavbarProps) => {
  const manager = useNavbarManager();
  return (
    <header>
      <nav className="flex justify-between items-center py-4.5 pl-5 pr-6">
        <span className="text-xl font-bold">{title}</span>
        <div className="flex items-center gap-x-4">
          {manager.auth.user && (
            <Dropdown className="relative">
              <Dropdown.Head>
                {({ onToggleDropdown }) => (
                  <button
                    type="button"
                    className="cursor-pointer flex items-center gap-x-4"
                    onClick={onToggleDropdown}
                  >
                    <div className="flex items-center gap-x-2">
                      <Avatar />
                      <p className="text-m">
                        {manager.auth.user?.user_metadata.fullName}
                      </p>
                    </div>
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
                        onClick={manager.getLogoutHandler}
                      >
                        <p className="text-m text-left">Logout</p>
                      </button>
                    )}
                  </Dropdown.Item>
                  {manager.isRecruiter && !manager.isInRecruiterDashboard && (
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
                  {manager.isInRecruiterDashboard && (
                    <Dropdown.Item>
                      {() => (
                        <Link
                          href={PATHS.root}
                          className="p-2 cursor-pointer w-full hover:bg-primary-hover hover:text-neutral-10 text-m"
                        >
                          Back to Home
                        </Link>
                      )}
                    </Dropdown.Item>
                  )}
                </div>
              </Dropdown.Body>
            </Dropdown>
          )}
          {!manager.auth.user && (
            <Button onClick={manager.getLoginHandler}>Login</Button>
          )}
        </div>
      </nav>
      <div className="border border-neutral-40" />
    </header>
  );
};

export default Navbar;
