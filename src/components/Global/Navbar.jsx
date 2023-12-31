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
        <div className="lg:flex hidden gap-4">
          <Link to={"/"} className="active:scale-95 transform transition-all hover:bg-[#373737] w-fit py-1 px-3 rounded-xl">Client Management</Link>
          <Link to={"/inventory"} className="active:scale-95 transform transition-all hover:bg-[#373737] w-fit py-1 px-3 rounded-xl">Inventory</Link>
          <Link to={"/payment-tracking"} className="active:scale-95 transform transition-all hover:bg-[#373737] w-fit py-1 px-3 rounded-xl">Payment Tracking</Link>
          <Link to={"/creditors"} className="active:scale-95 transform transition-all hover:bg-[#373737] w-fit py-1 px-3 rounded-xl">Creditors</Link>
        </div>
        <button onClick={() => setOpen(!open)} className="lg:hidden grid gap-1">
          <div
            className={`h-1 rounded-full bg-white w-8 ${
              open ? "translate-y-2 rotate-45" : ""
            } transition-all transform duration-500 delay-300`}
          ></div>
          <div
            className={`h-1 rounded-full bg-white w-8 ${
              open ? "translate-x-[200%]" : ""
            } transition-all transform duration-300 delay-100`}
          ></div>
          <div
            className={`h-1 rounded-full bg-white w-8 ${
              open ? "-translate-y-2 -rotate-45" : ""
            } transition-all transform duration-500 delay-300`}
          ></div>
        </button>
        <motion.div
          animate={
            open
              ? { clipPath: "inset(0 0 0 0)" }
              : { clipPath: "inset(0 0 0 100%)" }
          }
          className="absolute top-[100%] right-0 min-h-screen bg-[#2b2b2b] inset-x-0"
        >
          <div className="flex w-full text-xl gap-3 items-center justify-center flex-col py-56">
            <Link onClick={() => setOpen(false)} className="active:scale-95 transform transition-all hover:bg-[#373737] w-fit p-3 rounded-xl text-center" to={"/inventory"}>
              Inventory
            </Link>
            <Link onClick={() => setOpen(false)} className="active:scale-95 transform transition-all hover:bg-[#373737] w-fit p-3 rounded-xl text-center" to={"/"}>
              Client Management
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className="active:scale-95 transform transition-all hover:bg-[#373737] w-fit p-3 rounded-xl text-center"
              to={"/payment-tracking"}
            >
              Payment Tracking
            </Link>
          </div>
        </motion.div>
      </nav>
    </div>
  );
};

export default Navbar;
