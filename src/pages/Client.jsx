const Client = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 w-full min-h-screen py-32">
       <h1 className="font-bold uppercase text-2xl md:text-4xl">Client management</h1>

       {/* Search Client */}
       <div className="flex gap-2 w-full md:max-w-md rounded-full overflow-hidden lg:max-w-lg bg-white items-center justify-center mt-4">
        <input type="text" className="flex-1 p-3 text-black focus:outline-none bg-transparent"/>
          <button className="text-black p-3 rounded-full hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
       </div>
    </div>
  )
}

export default Client