import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full items-center justify-center bg-opacity-50 backdrop-blur-md z-50 bg-[#2b2b2b] shadow-xl">
      <nav className="w-full flex justify-between py-6 items-center px-4 md:px-8 lg:px-12">
        <Link to={"/"} className="text-xl md:text-2xl font-bold">Livonia</Link>
        <div className="lg:flex hidden gap-8">
          <Link to={"/client"}>Client Management</Link>
          <Link to={"/inventory"}>Inventory</Link>
          <Link to={"/payment-tracking"}>Payment Tracking</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
