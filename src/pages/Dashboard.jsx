import { useState } from "react";
import SideBar from "../components/SideBar";
import Transactions from "../components/Transactions/Transactions";
import Clients from "../components/Clients/Clients";

const Dashboard = () => {
  const [activeScreen, setActiveScreen] = useState("transactions");
  return (
    <div className="items-center relative justify-center w-full min-h-screen grid grid-cols-8">
      <SideBar setActiveScreen={setActiveScreen} />
      {activeScreen === "transactions" && <Transactions />}
      {activeScreen === "clients" && <Clients />}
    </div>
  );
};

export default Dashboard;
