import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const InventoryName = () => {
  const { name } = useParams();
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [updateData, setUpdateData] = useState({
    quantity: "",
    price: "",
  });
  const [clients, setClients] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [names, setNames] = useState("");
  const [error, setError] = useState("");
  const [openTransaction, setOpenTransaction] = useState(false);
  const [brand, setBrand] = useState("");
  const[brands,setBrands] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [newQuantityInput, setNewQuantityInput] = useState("");
  const formatDate = (createdAt) => {
    const formattedDate = new Date(createdAt).toLocaleDateString();
    const formattedTime = new Date(createdAt).toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  };
  useEffect(() => {
    const getInnventory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/inventory/${name}`
        );
        if (response.status === 200) {
          setInventory(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getInnventory();
  }, [name]);

  const addInventory = async () => {
    setError("");
    try {
      const response = await axios.post("http://localhost:8000/inventory", {
        name: name,
        brand: brand,
        size: size,
        quantity: quantity,
        price: price,
      });
      if (response.status === 200) {
        setIsOpen(false);

        // Filter the inventory array to exclude the added item
        setInventory((prevInventory) => [...prevInventory, response.data]);
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred");
    }
  };
  const handleClientSelect = (selectedClient) => {
    setSelectedClientId(selectedClient.id);
    setNames(selectedClient.name);
    setBrands(selectedClient.brand);
    setShowPopup(false); // Close the popup after selecting a client
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addTransactions = async () => {
    try {
      const response = await axios.post("http://localhost:8000/transaction", {
        clientId: selectedClientId,
        name,
        brand: brands,
        quantity: newQuantityInput,
        amount,
      });
      console.log(response);
      // Handle the response as needed
    } catch (error) {
      console.log(error);
    }
  };
  const postTransaction = () => {
    addTransactions();
  };

  const handleUpdate = async (inventory) => {
    setSelectedInventory(inventory);
    setUpdateData({
      quantity: inventory.quantity,
      price: inventory.price,
    });
    console.log(updateData);
    setOpenTransaction(true);
  };

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
  return (
    <div className="w-full justify-center items-center grid py-36 min-h-screen">
      <div className="w-full flex items-center justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 font-semibold p-3 mt-2 rounded-md"
        >
          Add {name}
        </button>
      </div>
      {/* Client Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="bg-slate-900/20 backdrop-blur px-4 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#2b2b2b] text-white p-3 md:p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
            >
              <div className="relative z-10 w-full grid gap-3">
                <div className="w-full flex justify-end items-end">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-[#3f3f3f] active:scale-95 text-white md:p-3 p-2 mb-2 rounded-full text-3xl grid place-items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {/* Name */}
                <div className="grid gap-2">
                  <span className="font-semibold">Name</span>
                  <span className="py-3 capitalize">{name}</span>
                </div>

                {/* Brand */}
                <div className="grid gap-2">
                  <span className="font-semibold">Brand</span>
                  <input
                    type="text"
                    className="p-3 rounded-md text-black focus:outline-none"
                    placeholder="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  />
                </div>

                {/* Size */}
                <div className="grid gap-2">
                  <span className="font-semibold">Size</span>
                  <input
                    type="text"
                    className="p-3 rounded-md text-black focus:outline-none"
                    placeholder="Size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    required
                  />
                </div>

                {/* Quantity */}
                <div className="grid gap-2">
                  <span className="font-semibold">Quantity</span>
                  <textarea
                    className="p-3 rounded-md text-black focus:outline-none"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>

                {/* Price  */}
                <div className="grid gap-2">
                  <span className="font-semibold">Price</span>
                  <input
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    value={price}
                    className="p-3 rounded-md text-black focus:outline-none"
                  />
                </div>

                {error ? (
                  <span className="text-red-500 font-semibold">{error}</span>
                ) : null}

                {/* Add client Button */}
                <button
                  onClick={addInventory}
                  className="w-full active:scale-95 transition-all transform font-semibold bg-green-600 rounded-md p-3 mt-2"
                >
                  Add inventory
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inventory modal */}
      {selectedInventory && openTransaction && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenTransaction(false)}
            className="bg-slate-900/20 backdrop-blur px-4 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#2b2b2b] text-white p-3 md:p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
            >
              <div className="relative z-10 w-full grid gap-3">
                <div className="w-full flex justify-end items-end">
                  <button
                    onClick={() => setOpenTransaction(false)}
                    className="bg-[#3f3f3f] active:scale-95 text-white md:p-3 p-2 mb-2 rounded-full text-3xl grid place-items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div>
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
                        value={names}
                        onChange={(e) => setNames(e.target.value)}
                        onFocus={() => setShowPopup(true)} // Show the popup when the input is focused
                      />
                      {showPopup && (
                        <div className="absolute top-0 z-30 left-0 w-full text-black border rounded-lg shadow-lg">
                          <input
                            type="text"
                            placeholder="Search for a client"
                            className="p-3 rounded-t-md w-full border border-slate-800 rounded "
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <div className="max-h-60 overflow-y-auto bg-white">
                            {filteredClients.map((client) => (
                              <div
                                key={client.id}
                                className="p-3 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleClientSelect(client)}
                              >
                                <span id="client">{client.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Name */}
                <div className="grid gap-2">
                  <span className="font-semibold">Name</span>
                  <span className="py-3 capitalize">{name}</span>
                </div>

                {/* Brand */}
                <div className="grid gap-2">
                  <span className="font-semibold">Quantity in Stock</span>
                  <span>{updateData.quantity}</span>
                  {/* <input
                    type="text"
                    className="p-3 rounded-md text-black focus:outline-none"
                    placeholder="Quantity"
                    value={updateData.quantity}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, quantity: e.target.value })
                    }
                    required
                  /> */}
                </div>
                <div className="grid gap-2">
                  <span className="font-semibold">Required Quantity</span>
                  <input
                    type="text"
                    className="p-3 rounded-md text-black focus:outline-none"
                    placeholder="Quantity"
                    value={newQuantityInput}
                    onChange={(e) => setNewQuantityInput(e.target.value)}
                    required
                  />
                </div>

                {/* Price  */}
                <div className="grid gap-2">
                  <span className="font-semibold">Price</span>
                  <input
                    onChange={(e) =>
                      setUpdateData({ ...updateData, price: e.target.value })
                    }
                    required
                    value={updateData.price}
                    className="p-3 rounded-md text-black focus:outline-none"
                  />
                </div>

                {error ? (
                  <span className="text-red-500 font-semibold">{error}</span>
                ) : null}

                {/* Add client Button */}
                <button
                  onClick={postTransaction}
                  className="w-full active:scale-95 transition-all transform font-semibold bg-green-600 rounded-md p-3 mt-2"
                >
                  Update Inventory
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {inventory.length <= 0 ? (
        <span className="text-red-500">No {name} found</span>
      ) : null}
      <div className="items-center justify-center flex w-full px-4 md:px-8 lg:px-12 flex-col">
        <div className=" md:grid mt-4 hidden text-lg font-bold grid-cols-7 gap-5 border rounded-t w-full p-2">
          <div>Date</div>
          <div>Name</div>
          <div>Brand</div>
          <div>Quantity</div>
          <div>Size</div>
          <div>Price</div>
        </div>
        {inventory.map((item, index) => (
          <div
            key={index}
            className=" grid md:grid-cols-7 capitalize grid-cols-1 gap-5 border w-full p-2"
          >
            <div>{formatDate(item.createdAt)}</div>
            <div>{item.name}</div>
            <div>{item.brand}</div>
            <div>{item.quantity}</div>
            <div>{item.size}</div>
            <div>{item.price}</div>
            <div>
              <button
                onClick={() => {
                  setError("");
                  handleUpdate(item);
                }}
                className="px-2 py-2 bg-green-600 rounded"
              >
                Transact
              </button>
            </div>
          </div>
        ))}
        {error ? <span className="text-center w-full">{error}</span> : null}
      </div>
    </div>
  );
};

export default InventoryName;
