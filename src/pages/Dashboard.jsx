import SideBar from "../components/SideBar";

const Dashboard = () => {
  return (
    <div className="flex items-center relative justify-center w-full flex-col min-h-screen pl-8 md:pl-16 lg:pl-32 pr-4 md:pr-8 lg:pr-12 py-32">
      <SideBar />
      <div>hello</div>
    </div>
  );
};

export default Dashboard;
