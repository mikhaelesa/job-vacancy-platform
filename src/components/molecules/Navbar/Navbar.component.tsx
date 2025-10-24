import Avatar from "@/src/components/atoms/Avatar";
import { SEARCH_PARAMS } from "@/src/constants/searchParams.constant";
import useAuth from "@/src/hooks/useAuth.hook";
import { useParamsManager } from "@/src/hooks/useParamsManager.hook";
import Button from "../../atoms/Button";

const Navbar = () => {
  const auth = useAuth();
  const paramsManager = useParamsManager();

  const handleLogin = () =>
    paramsManager.appendParams({ [SEARCH_PARAMS.login]: "true" });

  return (
    <header>
      <nav className="flex justify-between items-center py-4.5 pl-5 pr-6">
        <span className="text-xl font-bold">Job List</span>
        <div className="flex items-center gap-x-4">
          <Avatar />
          {!auth.user && <Button onClick={handleLogin}>Login</Button>}
        </div>
      </nav>
      <div className="border border-neutral-40" />
    </header>
  );
};

export default Navbar;
