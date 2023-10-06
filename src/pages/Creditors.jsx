import { useEffect, useState } from "react";
import axios from "axios";

const Creditors = () => {
  const [creditors, setCreditors] = useState([]);

  useEffect(() => {
    // Fetch creditors' names when the component mounts
    const fetchCreditors = async () => {
      try {
        const paymentMethod = "credit";
        const response = await axios.get(
          "http://localhost:8000/transaction/payment",
          {
            params: {
              payment: paymentMethod,
            },
          }
        );

        if (response.status === 200) {
          setCreditors(response.data);
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCreditors();
  }, []);

  const formatDate = (createdAt) => {
    const formattedDate = new Date(createdAt).toLocaleDateString();
    const formattedTime = new Date(createdAt).toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className="min-h-screen py-32 items-center justify-center flex w-full px-4 md:px-8 lg:px-12 flex-col">
      <p className="py-3 text-lg font-bold">Creditors List</p>
      <div className=" md:grid hidden text-lg font-bold grid-cols-5 gap-5 border rounded-t w-full p-2">
        <div>Date</div>
        <div>BatchId</div>
        <div>Name</div>
        <div>Contact</div>
        <div>Balance</div>
      </div>
      {creditors
        .slice()
        .reverse()
        .map((item, index) => {
          return (
            <div
              key={index}
              className="grid md:grid-cols-5 capitalize grid-cols-1 gap-5 border w-full p-2"
            >
              <div>{formatDate(item.createdAt)}</div>
              <div>{item.batchId}</div>
              <div>{item.client.name}</div>
              <div>{item.client.contact}</div>
              <div>{item.balance}</div>
            </div>
          );
        })}
    </div>
  );
};

export default Creditors;
