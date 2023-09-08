const PaymentTracking = () => {
  return (
    <div className="flex items-center justify-center w-full flex-col min-h-screen px-4 md:px-8 lg:px-12 py-28">
      <h1 className="font-bold uppercase text-2xl md:text-4xl">
        Payment Tracking
      </h1>
      <div className="border-4 border-gray-700 mt-4 gap-4 p-4 md:p-8 lg:p-12 rounded-3xl flex flex-col items-center justify-center lg:max-w-2xl md:max-w-lg w-full bg-[#2b2b2b]">
        {/* Client Name and Date of Purchase */}
        <div className="grid gap-6 lg:grid-cols-2 w-full">
          {/* Client name */}
          <div className="grid gap-2">
            <span>Client Name</span>
            <input
              type="text"
              placeholder="Name"
              className=" p-3 rounded-md text-black focus:outline-none"
            />
          </div>

          {/* Date name */}
          <div className="grid gap-2">
            <span>Date of Purchase</span>
            <input
              type="date"
              className="text-black p-3 rounded-md focus:outline-none"
            />
          </div>
        </div>

        <h1 className="col-span-2 w-full mt-4 font-semibold text-left">
          Product Details
        </h1>

        {/* Product details*/}
        <div className="grid gap-6 lg:grid-cols-2 border-b pb-6 border-gray-600 w-full">
          {/* Tires */}
          <div className="grid gap-2">
            <span>Tires</span>
            <input
              type="text"
              placeholder="Brand"
              className=" p-3 rounded-md text-black focus:outline-none"
            />
          </div>
          {/* Size and Quantity */}
          <div className="grid gap-2">
            <span className="text-[#2b2b2b] lg:block hidden">D</span>
            <input
              type="text"
              placeholder="Size"
              className="text-black p-3 rounded-md focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <input
              type="text"
              placeholder="Quantity"
              className="text-black p-3 rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-6 border-b pb-6 border-gray-600 lg:grid-cols-2 w-full">
          {/* Lubricants */}
          <div className="grid gap-2">
            <span>Lubricants</span>
            <input
              type="text"
              placeholder="Brand"
              className=" p-3 rounded-md text-black focus:outline-none"
            />
          </div>
          {/* Size and Quantity */}
          <div className="grid gap-2">
            <span className="text-[#2b2b2b] lg:block hidden">D</span>
            <input
              type="text"
              placeholder="Size"
              className="text-black p-3 rounded-md focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <input
              type="text"
              placeholder="Quantity"
              className="text-black p-3 rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 border-b pb-6 border-gray-600 w-full">
          {/* Batteries */}
          <div className="grid gap-2">
            <span>Batteries</span>
            <input
              type="text"
              placeholder="Brand"
              className=" p-3 rounded-md text-black focus:outline-none"
            />
          </div>
          {/* Size and Quantity */}
          <div className="grid gap-2">
            <span className="text-[#2b2b2b] lg:block hidden">D</span>
            <input
              type="text"
              placeholder="Size"
              className="text-black p-3 rounded-md focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <input
              type="text"
              placeholder="Quantity"
              className="text-black p-3 rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 border-b pb-6 border-gray-600 w-full">
          {/* Break Pads */}
          <div className="grid gap-2">
            <span>Break Pads</span>
            <input
              type="text"
              placeholder="Brand"
              className=" p-3 rounded-md text-black focus:outline-none"
            />
          </div>
          {/* Size and Quantity */}
          <div className="grid gap-2">
            <span className="text-[#2b2b2b] lg:block hidden">D</span>
            <input
              type="text"
              placeholder="Size"
              className="text-black p-3 rounded-md focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <input
              type="text"
              placeholder="Quantity"
              className="text-black p-3 rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 border-b pb-6 border-gray-600 w-full">
          {/* Break Shoes */}
          <div className="grid gap-2">
            <span>Break Shoes</span>
            <input
              type="text"
              placeholder="Brand"
              className=" p-3 rounded-md text-black focus:outline-none"
            />
          </div>
          {/* Size and Quantity */}
          <div className="grid gap-2">
            <span className="text-[#2b2b2b] lg:block hidden">D</span>
            <input
              type="text"
              placeholder="Size"
              className="text-black p-3 rounded-md focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <input
              type="text"
              placeholder="Quantity"
              className="text-black p-3 rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 border-b pb-6 border-gray-600 w-full">
          {/* Tubes */}
          <div className="grid gap-2">
            <span>Tubes</span>
            <input
              type="text"
              placeholder="Brand"
              className=" p-3 rounded-md text-black focus:outline-none"
            />
          </div>
          {/* Size and Quantity */}
          <div className="grid gap-2">
            <span className="text-[#2b2b2b] lg:block hidden">D</span>
            <input
              type="text"
              placeholder="Size"
              className="text-black p-3 rounded-md focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <input
              type="text"
              placeholder="Quantity"
              className="text-black p-3 rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 border-b pb-6 border-gray-600 w-full">
          {/* Filters */}
          <div className="grid gap-2">
            <span>Filters</span>
            <input
              type="text"
              placeholder="Brand"
              className=" p-3 rounded-md text-black focus:outline-none"
            />
          </div>
          {/* Size and Quantity */}
          <div className="grid gap-2">
            <span className="text-[#2b2b2b] lg:block hidden">D</span>
            <input
              type="text"
              placeholder="Size"
              className="text-black p-3 rounded-md focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <input
              type="text"
              placeholder="Quantity"
              className="text-black p-3 rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div className="col-span-2 w-full mt-4 flex-col flex font-semibold text-left">
         <div>
          <span>Payment method</span>
         </div>
         <div></div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTracking;
