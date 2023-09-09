const AdminLogin = () => {
  return (
    <div className="flex items-center relative justify-center w-full flex-col min-h-screen px-4 md:px-8 lg:px-12 py-32">
      <div className="bg-[#2b2b2b] gap-3 flex flex-col w-full md:max-w-md p-4 rounded-lg md:p-8">
        <h1 className="text-xl font-bold">Admin Login</h1>
        <div className="grid gap-2">
          <span className="font-semibold">Name</span>
          <input type="text" placeholder="User Name" className="text-black p-3 rounded-md focus:outline-none"/>
        </div>

        <div className="grid gap-2">
          <span className="font-semibold">Password</span>
          <input type="password" placeholder="Password" className="text-black p-3 rounded-md focus:outline-none"/>
        </div>
        <button className="bg-blue-500 p-3 rounded-md mt-4">
            Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
