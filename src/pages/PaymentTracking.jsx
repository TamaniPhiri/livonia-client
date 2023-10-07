import { useEffect, useState, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Modal from "react-modal";
Modal.setAppElement("#root");

const PaymentTracking = () => {
  const [selectedId, setSelectedId] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [otherQuantity, setOtherQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amountTendered, setAmountTendered] = useState("");
  const [balance, setBalance] = useState(0);
  const [clients, setClients] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState("");
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState("");

  const totalFooterRef = useRef(null);

  useEffect(() => {
    // Fetch client names when the component mounts
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:8000/clients");
        if (response.status === 200) {
          setClients(response.data);
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("http://localhost:8000/inventory");
        if (response.status === 200) {
          setInventory(response.data);
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchInventory();
  }, []);

  const handleInventoryClick = (item) => {
    setSelectedId(item.id);
    setSelectedInventory(item.name);
    setBrand(item.brand);
    setPrice(item.price);
    setQuantity(item.quantity);
    setIsModalOpen(false);
  };

  const handleClientSelect = (selectedClient) => {
    setSelectedClientId(selectedClient.id);
    setName(selectedClient.name);
    setShowPopup(false);
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateInventory = async (cart) => {
    try {
      const productsToUpdate = cart.map((product) => ({
        productId: product.id,
        newQuantity: product.quantity,
      }));

      const response = await axios.post(
        "http://localhost:8000/inventory/update",
        {
          products: productsToUpdate,
        }
      );

      if (response.status === 200) {
        console.log(response.data.message);
      } else {
        console.error("Failed to update inventory quantities");
      }
    } catch (error) {
      console.error("Error updating inventory quantities:", error);
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

  useEffect(() => {
    const newBalance = calculateBalance();
    setBalance(newBalance);
  }, [amountTendered, cart]);

  const calculateBalance = () => {
    if (!totalFooterRef.current) {
      return 0;
    }

    const totalText =
      totalFooterRef.current.querySelector("td:last-child").textContent;
    const totalAmount = parseFloat(totalText);

    if (isNaN(totalAmount) || isNaN(parseFloat(amountTendered))) {
      return 0;
    }

    const balance = totalAmount - parseFloat(amountTendered);
    return balance.toFixed(2);
  };

  const addTransactions = async () => {
    try {
      if (cart.length > 0) {
        const calculatedTotal = cart.reduce(
          (total, item) => total + parseFloat(item.amount),
          0
        );
        const transactionData = cart.map((item) => ({
          clientId: selectedClientId,
          total: calculatedTotal.toFixed(2),
          product: item.name,
          brand: item.brand,
          quantity: item.quantity,
          amount: item.amount,
          payment: paymentMethod,
          amountTendered: amountTendered,
          balance: balance,
        }));

        const response = await axios.post(
          "http://localhost:8000/transaction",
          transactionData
        );

        console.log(response);

        setCart([]);

        setName("");
        setBrand("");
        setQuantity("");
        setOtherQuantity("");
        setAmount("");
        setPaymentMethod("");
        setAmountTendered("");
        setBalance("");

        generatePDFReceipt(transactionData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postTransaction = () => {
    addTransactions();
  };

  const calculateNewAmount = (newQuantity, newDiscount) => {
    const newItem = inventory.find((item) => item.id === selectedId);
    const pricePerUnit = parseFloat(price);
    const quantityValue = parseFloat(newQuantity);
    const discountValue = parseFloat(newDiscount);
  
    if (newItem && !isNaN(pricePerUnit) && !isNaN(quantityValue) && !isNaN(discountValue)) {
      const discountedPrice = pricePerUnit - discountValue;
      const newAmount = discountedPrice * quantityValue;
      setAmount(newAmount.toFixed(2));
    } else {
      setAmount(""); // Reset amount if any field is not valid
    }
  };
  
  const generatePDFReceipt = (transactionData) => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    doc.setFont("times");
    doc.setFontSize(15);

    doc.text("LIVONIA INVESTMENTS LTD.", 80, 20);
    doc.setFontSize(11);
    doc.text(`Client Name: ${name}`, 20, 30);
    doc.text(`Total Amount: ${transactionData[0].total}`, 20, 40);
    doc.text(`Payment Type: ${transactionData[0].payment}`, 80, 40);
    doc.text(`Amount Tendered: ${transactionData[0].amountTendered}`, 20, 50);
    doc.text(`Change: ${transactionData[0].balance}`, 80, 50);
    doc.text(`Balance: ${name}`, 20, 70);

    doc.autoTable({
      startY: 60,
      head: [["Product", "Brand", "Quantity", "Amount"]],
      body: transactionData.map((item) => [
        item.product,
        item.brand,
        item.quantity,
        item.amount,
      ]),
    });

    // Save the PDF
    doc.save("receipt.pdf");
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
              onFocus={() => setShowPopup(true)}
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
            className="py-20 px-10 bg-white "
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
            <div className="h-[400px] overflow-y-auto">
              <ul>
                {Array.isArray(inventory) && inventory.length > 0 ? (
                  inventory
                    .slice()
                    .reverse()
                    .map((item) => (
                      <li
                        className="grid md:grid-cols-5 grid-cols-1 cursor-pointer py-2 px-2 bg-gray-200 hover:bg-slate-400 border border-black"
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
            </div>
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
        </div>

        {/* Payments */}
        <div className="col-span-2 w-full mt-4 gap-6 flex-col flex font-semibold text-left">
          <div className="grid gap-2">
            <span>In Stock</span>
            <input
              type="text"
              className=" p-3 rounded-md text-black focus:outline-none"
              placeholder="In Stock"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <span>Price Per Unit</span>
            <input
              type="text"
              className="p-3 rounded-md text-black focus:outline-none"
              placeholder="Amount"
              value={price}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <span>Quantity</span>
          <input
            type="text"
            className="p-3 rounded-md text-black focus:outline-none"
            placeholder="Quantity"
            value={otherQuantity}
            onChange={(e) => {
              const newQuantity = e.target.value;
              setOtherQuantity(newQuantity);
              calculateNewAmount(newQuantity, discount);
            }}
          />
          <div className="grid gap-2">
            <span>Discount</span>
            <input
              type="text"
              className="p-3 rounded-md text-black focus:outline-none"
              placeholder="discount"
              value={discount}
  onChange={(e) => {
    const newDiscount = e.target.value;
    setDiscount(newDiscount);
    calculateNewAmount(otherQuantity, newDiscount);
  }}
            />
          </div>

          <div className="grid gap-2">
            <span>Amount</span>
            <input
              type="text"
              className="p-3 rounded-md text-black focus:outline-none"
              placeholder="Amount"
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
                      <button
                        className="py-2 px-2 bg-blue-500 text-white rounded"
                        onClick={() => removeFromCart(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot ref={totalFooterRef}>
                <tr>
                  <td colSpan="3" className="border px-4 py-2 font-bold">
                    Total:
                  </td>
                  <td colSpan="2" className="border px-4 py-2 font-bold">
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
          <select
            className="p-3 rounded-md text-black focus:outline-none"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option>Select Payment</option>
            <option value="cash">cash</option>
            <option value="credit">credit</option>
          </select>
          <div className="grid gap-2">
            <span>Amount Tendered</span>
            <input
              type="text"
              className="p-3 rounded-md text-black focus:outline-none"
              placeholder="Amount"
              value={amountTendered}
              onChange={(e) => {
                setAmountTendered(e.target.value);
                const newBalance = calculateBalance();
                setBalance(newBalance);
              }}
            />
          </div>
          <div className="grid gap-2">
            <span>Balance</span>
            <input
              type="text"
              className="p-3 rounded-md text-black focus:outline-none"
              placeholder="Amount"
              value={balance}
              readOnly
            />
          </div>

          <button
            onClick={() => {
              updateInventory(cart);
              postTransaction();
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
