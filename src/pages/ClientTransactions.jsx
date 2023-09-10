import { useState } from "react";
import { useParams } from "react-router-dom";

const ClientTransactions = () => {
  const { id } = useParams();
  console.log(id);
  const[transactions,setTransactions]=useState([]);
  return <div>ClientTransactions</div>;
};

export default ClientTransactions;
