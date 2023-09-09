import SideBar from "../components/SideBar";

const Dashboard = () => {
  return (
    <div className="flex items-center relative justify-center w-full flex-col min-h-screen px-4 md:px-8 lg:px-12 py-32">
      <SideBar />
      <div>hello</div>
    </div>
  );
};

export default Dashboard;
