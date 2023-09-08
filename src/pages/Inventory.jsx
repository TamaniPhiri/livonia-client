const Inventory = () => {
  return (
    <div className="flex items-center justify-center w-full flex-col min-h-screen px-4 md:px-8 lg:px-12 py-28">
      <h1 className="font-bold uppercase text-2xl md:text-4xl">Inventory</h1>
      <div className="border-4 border-gray-700 mt-4 gap-4 p-4 md:p-8 lg:p-12 rounded-3xl flex flex-col items-center justify-center lg:max-w-2xl md:max-w-lg w-full bg-[#2b2b2b]">
        <div className="grid gap-6 lg:grid-cols-2 w-full">
          <div className="grid gap-2">
            <span>Product Name</span>
            <input
              type="text"
              placeholder="Name"
              className=" p-3 rounded-md text-black focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <span>Brand</span>
            <input
              type="text"
              placeholder="Brand Name"
              className=" p-3 rounded-md text-black focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <span>Size</span>
            <input
              type="text"
              placeholder="Size"
              className=" p-3 rounded-md text-black focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <span>Quantity</span>
            <input
              type="text"
              placeholder="Quantity"
              className=" p-3 rounded-md text-black focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
