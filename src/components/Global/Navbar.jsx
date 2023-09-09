import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed top-0 w-full items-center justify-center bg-opacity-50 backdrop-blur-md z-50 bg-[#2b2b2b] shadow-xl">
      <nav className="w-full relative flex justify-between py-6 items-center px-4 md:px-8 lg:px-12">
        <Link to={"/"} className="text-xl md:text-2xl font-bold">
          Livonia
        </Link>
        <div className="lg:flex hidden gap-8">
          <Link to={"/client"}>Client Management</Link>
          <Link to={"/inventory"}>Inventory</Link>
          <Link to={"/payment-tracking"}>Payment Tracking</Link>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden overflow-x-hidden grid gap-1"
        >
          <div className="h-1 rounded-full bg-white w-8"></div>
          <div className="h-1 rounded-full bg-white w-8"></div>
          <div className="h-1 rounded-full bg-white w-8"></div>
        </button>
        <motion.div
          animate={
            open
              ? { clipPath: "inset(0 0 0 0)" }
              : { clipPath: "inset(0 0 0 100%)" }
          }
          className="absolute top-[100%] right-0 min-h-screen bg-[#2b2b2b] inset-x-0"
        >
          <div className="flex w-full text-xl gap-6 items-center justify-center flex-col py-56">
            <Link to={"/inventory"}>Inventory</Link>
            <Link to={"/client"}>Client Management</Link>
            <Link to={"/payment-tracking"}>Payment Tracking</Link>
          </div>
        </motion.div>
      </nav>
    </div>
  );
};

export default Navbar;
