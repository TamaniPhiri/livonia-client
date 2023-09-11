import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ClientTransactions = () => {
  const { id } = useParams();
  console.log(id);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/transaction/${id}`
        );
        if (response.status === 200) {
          setTransactions(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTransactions();
  }, [id]);
  return (
    <div className="min-h-screen py-32 items-center justify-center flex w-full flex-col">
      <div>
        {transactions.map((item, index) => (
          <div key={index}>
            <div>{item.name}</div>
            <div>{item.brand}</div>
            <div>{item.quantity}</div>
            <div>{item.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientTransactions;
