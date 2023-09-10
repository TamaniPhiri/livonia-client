const PaymentTracking = () => {
  return (
    <div className="flex items-center justify-center w-full flex-col min-h-screen px-4 md:px-8 lg:px-12 py-32">
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

        <div className="grid gap-6 border-b pb-6 border-gray-600 lg:grid-cols-2 w-full">
          <select className="p-3 rounded-md">
            <option value="Tires">Tires</option>
            <option value="Lubricants">Lubricants</option>
            <option value="Batteries">Batteries</option>
            <option value="">Break Pads</option>
            <option value="">Break Shoes</option>
          </select>
          {/* Lubricants */}
          <div className=" text-black">
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

        <div className="col-span-2 w-full mt-4 gap-6 flex-col flex font-semibold text-left">
          <div className="grid gap-2">
            <span>Payment method</span>
            <input
              type="text"
              className=" p-3 rounded-md text-black focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <span>Amount Paid</span>
            <input
              type="text"
              className=" p-3 rounded-md text-black focus:outline-none"
            />
          </div>
          <button className="w-full bg-blue-500 p-3 rounded-md">
            Record Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentTracking;
