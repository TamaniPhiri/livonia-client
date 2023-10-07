import { Link } from "react-router-dom";

const Inventory = () => {
  return (
    <div className="flex items-center relative justify-center w-full flex-col min-h-screen px-4 md:px-8 lg:px-12 py-32">
      <h1 className="font-bold uppercase text-2xl md:text-4xl">Inventory</h1>
      <div className="grid grid-cols-2 gap-3 mt-6 text-center items-center justify-center">
        <Link to={"/inventory/brakes"} className="p-3 bg-slate-800 rounded-md">Brakes</Link>
        <Link to={"/inventory/tyres"} className="p-3 bg-slate-800 rounded-md">Tyres</Link>
        <Link to={"/inventory/lubricants"} className="p-3 bg-slate-800 rounded-md">Lubricants</Link>
        <Link to={"/inventory/batteries"} className="p-3 bg-slate-800 rounded-md">Batteries</Link>
        <Link to={"/inventory/tubes"} className="p-3 bg-slate-800 rounded-md">Tubes</Link>
        <Link to={"/inventory/filters"} className="p-3 bg-slate-800 rounded-md">Filters</Link>
      </div>
    </div>
  );
};

export default Inventory;
