const AdminLogin = () => {
  return (
    <div className="flex items-center relative justify-center w-full flex-col min-h-screen px-4 md:px-8 lg:px-12 py-32">
      <div className="bg-[#2b2b2b] gap-3 flex flex-col w-full md:max-w-md p-4 rounded-lg md:p-8">
        <div className="grid gap-2">
          <span>Name</span>
          <input type="text" placeholder="User Name" />
        </div>

        <div className="grid gap-2">
          <span>Name</span>
          <input type="password" placeholder="Password" />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
