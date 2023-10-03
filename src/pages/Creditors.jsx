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
      <div className=" md:grid hidden text-lg font-bold grid-cols-9 gap-5 border rounded-t w-full p-2">
        <div>Date</div>
        <div>Name</div>
        <div>Product</div>
        <div>Contact</div>
        <div>Brand</div>
        <div>Quantity</div>
        <div>Amount</div>
        <div>Total</div>
        <div>Payment</div>
      </div>
      {creditors.slice().reverse().map((item, index) => {
  return (
    <div
      key={index}
      className="grid md:grid-cols-9 capitalize grid-cols-1 gap-5 border w-full p-2"
    >
      <div>{formatDate(item.createdAt)}</div>
      <div>{item.client.name}</div>
      <div>{item.client.contact}</div>
      <div>{item.product}</div>
      <div>{item.brand}</div>
      <div>{item.quantity}</div>
      <div>{item.amount}</div>
      <div>{item.total}</div>
      <div>{item.payment}</div>
    </div>
  );
})}

    </div>
  );
};

export default Creditors;
