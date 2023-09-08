const PaymentTracking = () => {
  return (
    <div className="flex items-center justify-center w-full flex-col min-h-screen px-4 md:px-8 lg:px-12 py-28">
      <h1 className="font-bold uppercase text-2xl md:text-4xl">Payment Tracking</h1>
      <div className="border-4 border-gray-700 gap-4 p-4 md:p-8 lg:p-12 rounded-3xl grid lg:grid-cols-2 grid-cols-1 items-center justify-center lg:max-w-2xl md:max-w-lg w-full bg-[#2b2b2b]">
        <div className="grid gap-2">
          <span>
            Client Name
          </span>
          <input type="text" placeholder="Name" className=" p-3 rounded-md"/>
        </div>
        <div className="grid gap-2">
          <span>
            Date of Purchase
          </span>
          <input type="date" className="text-black p-3 rounded-md"/>
        </div>
      </div>
    </div>
  )
}

export default PaymentTracking