import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full items-center justify-center bg-[#2b2b2b] shadow-xl">
      <nav className="w-full flex justify-between items-center px-4 md:px-8 lg:px-12">
        <div>1</div>
        <div>
          <Link>Client Management</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
