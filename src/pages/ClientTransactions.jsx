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
          `http://localhost:8000/transaction/client/${id}`
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
    <div>
      <div>
        {transactions.map((item, index) => (
          <div key={index}>{item.name}</div>
        ))}
      </div>
    </div>
  );
};

export default ClientTransactions;
