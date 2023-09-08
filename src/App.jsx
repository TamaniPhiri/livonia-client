import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Client from "./pages/Client";
import PaymentTracking from "./pages/PaymentTracking";
import Navbar from "./components/Global/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={Dashboard} />
        <Route path="/inventory" Component={Inventory} />
        <Route path="/client" Component={Client} />
        <Route path="/payment-tracking" Component={PaymentTracking} />
      </Routes>
    </>
  );
}

export default App;
