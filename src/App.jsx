import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Client from "./pages/Client";
import PaymentTracking from "./pages/PaymentTracking";
import Navbar from "./components/Global/Navbar";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={AdminLogin} />
        <Route path="/dashboard/*" Component={Dashboard} />
        <Route path="/inventory" Component={Inventory} />
        <Route path="/client" Component={Client} />
        <Route path="/payment-tracking" Component={PaymentTracking} />
        <Route path="/login" Component={Login} />
      </Routes>
    </>
  );
}

export default App;
