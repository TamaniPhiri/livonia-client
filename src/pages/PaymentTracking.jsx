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
        <div className="grid gap-6 lg:grid-cols-2 w-full">
          {/* Tires */}
          <div className="grid gap-2">
            <span>Tires</span>
            <input
              type="text"
              placeholder="Name"
              className=" p-3 rounded-md text-black focus:outline-none"
            />
          </div>

          {/* Clien */}
          <div className="grid gap-2">
            <span className="text-[#2b2b2b] lg:block hidden">
              Date of Purchase
            </span>
            <input
              type="date"
              className="text-black p-3 rounded-md focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <input
              type="date"
              className="text-black p-3 rounded-md focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTracking;
