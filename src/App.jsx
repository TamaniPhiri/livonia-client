import { Route, Routes } from "react-router-dom";
import "./App.css";
import Inventory from "./pages/Inventory";
import Client from "./pages/Client";
import PaymentTracking from "./pages/PaymentTracking";
import Navbar from "./components/Global/Navbar";
import Login from "./pages/Login";
import ClientTransactions from "./pages/ClientTransactions";
import InventoryName from "./pages/InventoryName";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={Client} />
        <Route path="/inventory" Component={Inventory} />
        <Route path="/inventory/:name" Component={InventoryName} />
        <Route path="/client/transaction/:id" Component={ClientTransactions} />
        <Route path="/payment-tracking" Component={PaymentTracking} />
        <Route path="/login" Component={Login} />
      </Routes>
    </>
  );
}

export default App;
