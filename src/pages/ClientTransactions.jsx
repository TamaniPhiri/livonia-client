import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ClientTransactions = () => {
  const { id } = useParams();
  console.log(id);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
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
        setError(error.response.data);
      }
    };
    getTransactions();
  }, [id]);
  const formatDate = (createdAt) => {
    const formattedDate = new Date(createdAt).toLocaleDateString();
    const formattedTime = new Date(createdAt).toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  };
  return (
    <div className="min-h-screen py-32 items-center justify-center flex w-full px-4 md:px-8 lg:px-12 flex-col">
      <div className=" md:grid hidden grid-cols-5 gap-5 border w-full">
        <div>Date</div>
        <div>Name</div>
        <div>Brand</div>
        <div>Quantity</div>
        <div>Amount</div>
      </div>
      {transactions.map((item, index) => (
        <div
          key={index}
          className=" grid md:grid-cols-5 grid-cols-1 gap-5 border w-full"
        >
          <div>{formatDate(item.createdAt)}</div>
          <div>{item.name}</div>
          <div>{item.brand}</div>
          <div>{item.quantity}</div>
          <div>{item.amount}</div>
        </div>
      ))}
      {error ? <span>{error}</span> : null}
    </div>
  );
};

export default ClientTransactions;
