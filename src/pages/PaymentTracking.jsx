import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
Modal.setAppElement("#root");

const PaymentTracking = () => {
  const [selectedId, setSelectedId] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [otherQuantity, setOtherQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [clients, setClients] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState("");
  const [cart, setCart] = useState([]);

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

  const handleInventoryClick = (item) => {
    setSelectedId(item.id);
    setSelectedInventory(item.name);
    setBrand(item.brand);
    setQuantity(item.quantity);
    setIsModalOpen(false);
  };

  const handleClientSelect = (selectedClient) => {
    setSelectedClientId(selectedClient.id);
    setName(selectedClient.name);
    setShowPopup(false); // Close the popup after selecting a client
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateInventory = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/inventory/${selectedId}`,
        {
          quantity: otherQuantity,
        }
      );

      if (response.status === 200) {
        // Assuming that response.data contains the updated inventory data
        setInventory(response.data); // Update the client-side inventory state
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = () => {
    if (selectedId && otherQuantity && selectedInventory) {
      const productToAdd = {
        id: selectedId,
        name: selectedInventory,
        brand: brand,
        amount: amount,
        quantity: otherQuantity,
      };
      setCart([...cart, productToAdd]);
      setSelectedId("");
      setBrand("");
      setQuantity("");
      setAmount("");
      setOtherQuantity("");
      setSelectedInventory("");
    }
  };
  const removeFromCart = (indexToRemove) => {
    const updatedCart = [...cart];
    updatedCart.splice(indexToRemove, 1);
    setCart(updatedCart);
  };

  const addTransactions = async () => {
    try {
      const response = await axios.post("http://localhost:8000/transaction", {
        clientId: selectedClientId,
        product: selectedInventory,
        brand: brand,
        quantity: otherQuantity,
        amount: amount,
      });
      console.log(response);
      setName("");
      setBrand("");
      setQuantity("");
      setOtherQuantity("");
      setAmount("");
      // Handle the response as needed
    } catch (error) {
      console.log(error);
    }
  };

  const postTransaction = () => {
    addTransactions();
  };

  const handleQuantityChange = (newQuantity) => {
    const newItem = inventory.find((item) => item.id === selectedId);

    if (newItem) {
      const newAmount = parseFloat(newItem.price) * parseFloat(newQuantity);
      setAmount(newAmount.toFixed(2));
    }
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
          <button
            className="p-3 mt-4 bg-white w-full rounded text-gray-400 text-start px-3"
            onClick={() => setIsModalOpen(true)}
          >
            Open Inventory
          </button>
        </div>
        <h1 className="col-span-2 w-full mt-4 font-semibold text-left">
          Product Details
        </h1>

        <div className="grid gap-6 border-b pb-6 border-gray-600 lg:grid-cols-2 w-full">
          <input
            className="bg-white rounded text-black text-start px-3"
            type="button"
            placeholder="Open Inventory"
            value={selectedInventory}
          />

          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            className="py-20 px-10 bg-white"
            appElement={document.getElementById("root")}
          >
            <h2>Inventory</h2>
            <div className="grid md:grid-cols-5 grid-cols-1 bg-gray-700 text-white py-2 px-2">
              <div>Name</div>
              <div>Brand</div>
              <div>Size</div>
              <div>Quantity</div>
              <div>Price</div>
            </div>
            <ul>
              {Array.isArray(inventory) && inventory.length > 0 ? (
                inventory
                  .slice()
                  .reverse()
                  .map((item) => (
                    <li
                      className="grid md:grid-cols-5 grid-cols-1 cursor-pointer py-2 px-2 bg-gray-200 hover:bg-slate-400"
                      key={item.id}
                      onClick={() => handleInventoryClick(item)}
                    >
                      <p className="text-black">{item.name}</p>
                      <p className="text-black">{item.brand}</p>
                      <p className="text-black">{item.size}</p>
                      <p className="text-black">{item.quantity}</p>
                      <p className="text-black">{item.price}</p>
                    </li>
                  ))
              ) : (
                <p>No inventory data available.</p>
              )}
            </ul>

            <button
              className="bg-black rounded py-2 px-2 mt-2"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </Modal>
          {/* Brand */}
          <div className="grid">
            <input
              type="text"
              placeholder="Brand"
              className="p-3 rounded-md text-black focus:outline-none"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          {/* Size */}
        </div>

        {/* Payments */}
        <div className="col-span-2 w-full mt-4 gap-6 flex-col flex font-semibold text-left">
          <div className="grid gap-2">
            <span>In Stock</span>
            <input
              type="text"
              className=" p-3 rounded-md text-black focus:outline-none"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <span>Quantity</span>
            <input
              type="text"
              className="p-3 rounded-md text-black focus:outline-none"
              value={otherQuantity}
              onChange={(e) => {
                setOtherQuantity(e.target.value);
                handleQuantityChange(e.target.value);
              }}
            />
          </div>
          <div className="grid gap-2">
            <span>Amount Paid</span>
            <input
              type="text"
              className="p-3 rounded-md text-black focus:outline-none"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              addToCart();
            }}
            className="w-full bg-blue-500 p-3 rounded-md"
          >
            Add to Cart
          </button>

          <div className="grid gap-2">
            <span>Cart</span>
            <table className="w-full table-auto text-black bg-white">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Product</th>
                  <th className="border px-4 py-2">Brand</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2">{item.brand}</td>
                    <td className="border px-4 py-2">{item.quantity}</td>
                    <td className="border px-4 py-2">{item.amount}</td>
                    <td className="border px-4 py-2">
                      <button className="py-2 px-2 bg-blue-500 text-white rounded" onClick={() => removeFromCart(index)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="border px-4 py-2 font-bold">
                    Total:
                  </td>
                  <td className="border px-4 py-2 font-bold">
                    {cart
                      .reduce(
                        (total, item) => total + parseFloat(item.amount),
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <button
            onClick={() => {
              postTransaction();
              updateInventory();
            }}
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
