import { useEffect, useState } from "react";
import axios from "axios";

const Creditors = () => {
  const [creditors, setCreditors] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedCreditor, setSelectedCreditor] = useState(null);
  const [updateAmount, setUpdateAmount] = useState("");

  const openUpdatePopup = (creditor) => {
    setShowUpdate(true);
    setSelectedCreditor(creditor);
  };

  const closeUpdatePopup = () => {
    setShowUpdate(false);
    setSelectedCreditor(null);
  };

  useEffect(() => {
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

  const handlePaymentChange = (value) => {
    setSelectedPayment(value);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedCreditor) {
        return;
      }

      const data = {
        amountTendered: updateAmount,
        payment: selectedPayment,
      };

      const response = await axios.put(
        `http://localhost:8000/transaction/update/${selectedCreditor.batchId}`,
        data
      );

      if (response.status === 200) {
        console.log("Transaction updated successfully");
        console.log(response.data);
        closeUpdatePopup();
        window.location.reload();
      } else {
        console.error("Failed to update transaction");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen py-32 items-center justify-center flex w-full px-4 md:px-8 lg:px-12 flex-col">
      <p className="py-3 text-lg font-bold">Creditors List</p>
      {creditors.length === 0 ? (
        <p className="text-lg">No creditors found.</p>
      ) : (
        <div className=" md:grid hidden text-lg font-bold grid-cols-8 gap-5 border rounded-t w-full p-2">
          <div>Date</div>
          <div>BatchId</div>
          <div>Name</div>
          <div>Contact</div>
          <div>Total</div>
          <div>Product</div>
          <div>Balance</div>
          <div>Update</div>
        </div>
      )}
      {creditors.length > 0 && creditors
        .slice()
        .reverse()
        .map((item, index) => {
          return (
            <div
              key={index}
              className="grid md:grid-cols-8 capitalize grid-cols-1 gap-5 border w-full p-2"
            >
              <div>{formatDate(item.createdAt)}</div>
              <div>{item.batchId}</div>
              <div>{item.client.name}</div>
              <div>{item.client.contact}</div>
              <div>{item.total}</div>
              <div>{item.product}</div>
              <div>{item.balance}</div>
              <div className="gap-4">
                <button
                  onClick={() => openUpdatePopup(item)}
                  className="py-2 px-2 bg-green-500 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          );
        })}
      {showUpdate && selectedCreditor && selectedCreditor.client && (
        <div className="absolute items-center justify-center bg-white text-black w-[500px] px-6 py-6 rounded-lg">
          <p className="text-black">Update Credit Status</p>
          <div>
            <p>Name</p>
            <p className="w-full py-2 border-2 border-gray-500 rounded">
              {selectedCreditor.client.name}
            </p>
          </div>
          <div>
            <p>Status</p>
            <select
              className="w-full py-2 border-2 border-gray-500 rounded"
              onChange={(e) => handlePaymentChange(e.target.value)}
              value={selectedPayment}
            >
              <option>Select Payment</option>
              <option value="credit">Credit</option>
              <option value="settled">Settled</option>
            </select>
          </div>
          <div>
            <p>Amount</p>
            <input
              className="w-full py-2 border-2 border-gray-500 rounded"
              placeholder="amount"
              type="number"
              value={updateAmount}
              onChange={(e) => setUpdateAmount(e.target.value)}
            />
          </div>
          <div className="w-full flex md:flex-row flex-col gap-4 justify-center items-center mt-4">
            <button
              onClick={handleSubmit}
              className="w-full text-center bg-green-500 text-white px-4 py-2 rounded-md flex"
            >
              Submit
            </button>
            <button
              className="w-full bg-green-500 text-white px-4 py-2 rounded-md flex"
              onClick={closeUpdatePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Creditors;