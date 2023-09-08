const PaymentTracking = () => {
  return (
    <div className="flex items-center justify-center w-full flex-col min-h-screen px-4 md:px-8 lg:px-12 py-28">
      {/* heading */}
      <h1 className="font-bold uppercase text-2xl md:text-4xl">
        Payment Tracking
      </h1>

      {/* Payment form */}
      <div className="border-2 border-gray-700 mt-4 gap-4 p-4 md:p-8 lg:p-12 rounded-3xl grid lg:grid-cols-2 grid-cols-1 items-center justify-center lg:max-w-2xl md:max-w-lg w-full bg-[#2b2b2b]">
        {/* Client Name */}
        <div className="grid gap-2">
          <span>Client Name</span>
          <input
            type="text"
            placeholder="Name"
            className=" p-3 rounded-md text-black focus:outline-none"
          />
        </div>

        {/* Date of purchase */}
        <div className="grid gap-2">
          <span>Date of Purchase</span>
          <input
            type="date"
            className="text-black p-3 rounded-md focus:outline-none"
          />
        </div>

        {/* Product details */}
        <h1 className="col-span-2 w-full mt-4 font-semibold text-left">
          Product Details
        </h1>

        {/* Tires */}
        <div className="grid gap-2">
          <span>Tires</span>
          <input
            type="text"
            className="text-black p-3 rounded-md focus:outline-none"
            placeholder="Brand"
          />
        </div>
        <div className="grid gap-2">
          <span className="text-[#2b2b2b]">Tires</span>
          <input
            type="text"
            className="text-black p-3 rounded-md focus:outline-none"
            placeholder="Size"
          />
        </div>
        <div className="grid gap-2 col-span-2">
          <input
            type="text"
            className="text-black p-3 lg:w-1/2 rounded-md focus:outline-none"
            placeholder="Quantity"
          />
        </div>

        {/* Lubricants */}
        <div className="grid gap-2">
          <span>Lubricants</span>
          <input
            type="text"
            className="text-black p-3 rounded-md focus:outline-none"
            placeholder="Brand"
          />
        </div>
        <div className="grid gap-2">
          <span className="text-[#2b2b2b]">Lubricants</span>
          <input
            type="text"
            className="text-black p-3 rounded-md focus:outline-none"
            placeholder="Size"
          />
        </div>
        <div className="grid gap-2">
          <input
            type="text"
            className="text-black p-3 lg:w-1/2 rounded-md focus:outline-none"
            placeholder="Quantity"
          />
        </div>

        {/* Batteries */}
        <div className="grid gap-2">
          <span>Batteries</span>
          <input
            type="text"
            className="text-black p-3 rounded-md focus:outline-none"
            placeholder="Brand"
          />
        </div>
        <div className="grid gap-2">
          <span className="text-[#2b2b2b]">Batteries</span>
          <input
            type="text"
            className="text-black p-3 rounded-md focus:outline-none"
            placeholder="Size"
          />
        </div>
        <div className="grid gap-2">
          <input
            type="text"
            className="text-black p-3 lg:w-1/2 rounded-md focus:outline-none"
            placeholder="Quantity"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentTracking;
