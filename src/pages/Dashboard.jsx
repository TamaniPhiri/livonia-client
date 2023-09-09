import SideBar from "../components/SideBar";

const Dashboard = () => {
  return (
    <div className="items-center relative justify-center w-full min-h-screen grid grid-cols-8">
      <SideBar />
      <div className=" col-span-7">hello</div>
    </div>
  );
};

export default Dashboard;
