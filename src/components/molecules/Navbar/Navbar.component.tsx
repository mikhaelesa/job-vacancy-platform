import Avatar from "@/src/components/atoms/Avatar";

const Navbar = () => {
  return (
    <header>
      <nav className="flex justify-between items-center py-4.5 pl-5 pr-6">
        <span className="text-xl font-bold">Job List</span>
        <Avatar />
      </nav>
      <div className="border border-neutral-40" />
    </header>
  );
};

export default Navbar;
