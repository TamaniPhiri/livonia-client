import { useEffect, useState } from "react";
import axios from "axios";

const PaymentTracking = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [clients, setClients] = useState([]);
  const[inventory, setInventory] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    // Fetch client names when the component mounts
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:8000/clients");
        if (response.status === 200) {
          setClients(response.data);
          console.log(response); // Store client names in state
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchClients(); // Call the function to fetch client names
  }, []);

  useEffect(() => {
    // Fetch client names when the component mounts
    const fetchInventory = async () => {
      try {
        const response = await axios.get("http://localhost:8000/inventory");
        if (response.status === 200) {
          setInventory(response.data);
          console.log(response); // Store client names in state
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchInventory(); // Call the function to fetch client names
  }, []);

  const handleClientSelect = (selectedClient) => {
    setSelectedClientId(selectedClient.id);
    setName(selectedClient.name);
    setShowPopup(false); // Close the popup after selecting a client
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addTransactions = async () => {
    try {
      const response = await axios.post("http://localhost:8000/transaction", {
        clientId: selectedClientId,
        name: name,
        brand: brand,
        quantity: quantity,
        amount: amount,
      });
      console.log(response);
      setName("");
      setBrand("");
      setQuantity("");
      setAmount("");
      // Handle the response as needed
    } catch (error) {
      console.log(error);
    }
  };

  const postTransaction = () => {
    addTransactions();
  };

  return (
    <div className="flex items-center justify-center w-full flex-col min-h-screen px-4 md:px-8 lg:px-12 py-32">
      <h1 className="font-bold uppercase text-2xl md:text-4xl">
        Payment Tracking
      </h1>
      <div className="border-4 border-gray-700 mt-4 gap-4 p-4 md:p-8 lg:p-12 rounded-3xl flex flex-col items-center justify-center lg:max-w-2xl md:max-w-lg w-full bg-[#2b2b2b]">
        {/* Client name */}
        <div className="grid gap-2 w-full">
          <span>Client Name</span>
          <div className="relative">
            <input
              type="text"
              id="clientName"
              name="clientName"
              placeholder="Client Name"
              className="p-3 rounded-md text-black focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setShowPopup(true)} // Show the popup when the input is focused
            />
            {showPopup && (
              <div className="absolute top-0 left-0 w-full bg-white border rounded-lg shadow-lg">
                <input
                  type="text"
                  placeholder="Search for a client"
                  className="p-3 rounded-t-md w-full border border-slate-800 rounded text-black"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="max-h-60 overflow-y-auto">
                  {filteredClients.map((client) => (
                    <div
                      key={client.id}
                      className="p-3 cursor-pointer hover:bg-gray-100 text-black"
                      onClick={() => handleClientSelect(client)}
                    >
                      {client.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <h1 className="col-span-2 w-full mt-4 font-semibold text-left">
          Product Details
        </h1>

        <div className="grid gap-6 border-b pb-6 border-gray-600 lg:grid-cols-2 w-full">
          <select className="p-3 rounded-md text-black">
            <option value="Tires">Tires</option>
            <option value="Lubricants">Lubricants</option>
            <option value="Batteries">Batteries</option>
            <option value="Break Pads">Break Pads</option>
            <option value="Break Shoes">Break Shoes</option>
            <option value="Tubes">Tubes</option>
            <option value="Filters">Filters</option>
          </select>

          {/* Brand */}
          <div className="grid">
            <input
              type="text"
              placeholder="Brand"
              className=" p-3 rounded-md text-black focus:outline-none"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          {/* Size */}
        </div>

        {/* Payments */}
        <div className="col-span-2 w-full mt-4 gap-6 flex-col flex font-semibold text-left">
          <div className="grid gap-2">
            <span>Quantity</span>
            <input
              type="text"
              className=" p-3 rounded-md text-black focus:outline-none"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <span>Amount Paid</span>
            <input
              type="text"
              className=" p-3 rounded-md text-black focus:outline-none"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button
            onClick={postTransaction}
            className="w-full bg-blue-500 p-3 rounded-md"
          >
            Record Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentTracking;
