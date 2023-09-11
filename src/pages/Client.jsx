import { useEffect, useState } from "react";
import ClientModal from "../components/ClientModal";
import axios from "axios";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Client = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [clientName, setClientName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    category: "",
  });

  useEffect(() => {
    const getClients = async () => {
      try {
        const response = await axios.get("http://localhost:8000/clients");
        if (response.status === 200) {
          setClients(response.data);
          setSearchResults(response.data); // Initialize searchResults with all clients
        }
      } catch (error) {
        console.log(error);
      }
    };
    getClients();
  }, []);

  const searchClientByName = () => {
    const filteredClients = clients.filter((client) =>
      client.name.toLowerCase().includes(clientName.toLowerCase())
    );
    setSearchResults(filteredClients);
    setNoResults(filteredClients.length === 0);
  };

  const resetSearch = () => {
    setClientName("");
    setSearchResults(clients); // Reset searchResults to all clients
    setNoResults(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete these results"
    );
    if (confirmDelete) {
      try {
        axios.delete(`http://localhost:8000/clients/${id}`);
        setSearchResults(searchResults.filter((client) => client.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdate = (client) => {
    setSelectedClient(client);
    setUpdateData({
      name: client.name,
      email: client.email,
      contact: client.contact,
      address: client.address,
      category: client.category,
    });
    setUpdateModalOpen(true);
  };

  const handleSubmitUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/results/${selectedClient.id}`,
        updateData
      );
      if (response.status === 200) {
        // Update the client in the state
        const updatedResult = response.data.client;
        setClients((prevClients) =>
          prevClients.map((client) =>
            client.id === updatedResult.id ? updatedResult : client
          )
        );

        // Close the modal
        setUpdateModalOpen(false);
      }
    } catch (error) {
      alert("Error Updating Client details");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 w-full min-h-screen py-32">
      <h1 className="font-bold uppercase text-2xl md:text-4xl">
        Client management
      </h1>

      {/* Search Client */}
      <div className="flex gap-2 w-full md:max-w-sm rounded-full overflow-hidden lg:max-w-md bg-white items-center justify-center mt-4">
        <input
          type="text"
          className="flex-1 p-3 text-black focus:outline-none bg-transparent"
          placeholder="Search for clients"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <div className="flex">
          {clientName && (
            <button
              onClick={resetSearch}
              className="text-black rounded-full hover:text-red-500 transition-all transform duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
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
          )}
          <button
            onClick={searchClientByName}
            className="text-black p-3 rounded-full hover:bg-gray-300 m-1 transition-all transform duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>

      <ClientModal />
      <div className="rounded-xl bg-[#2b2b2b] gap-3 p-4 grid w-full mt-6">
        <div className="md:grid hidden w-full gap-3 items-center font-extrabold border-b py-2 grid-cols-1 md:grid-cols-6">
          <div>Name</div>
          <div>Email</div>
          <div>Contact</div>
          <div>Address</div>
          <div>Category</div>
          <div>Business history</div>
        </div>
        {noResults ? (
          <div className="text-red-500">No results found.</div>
        ) : (
          searchResults.map((item, index) => (
            <div
              key={index}
              className="grid w-full capitalize items-center border-b gap-3 grid-cols-1 py-2 md:grid-cols-6"
            >
              <div>{item.name}</div>
              <div>{item.email}</div>
              <div>{item.contact}</div>
              <div>{item.address}</div>
              <div>{item.category}</div>
              <div className="flex items-center gap-1">
                <Link
                  to={`/client/transaction/${item.id}`}
                  className="bg-blue-500 rounded-md text-center font-semibold p-2"
                >
                  Transactions
                </Link>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 p-2 rounded-md"
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                  <button onClick={() => handleUpdate(item)}>
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <AnimatePresence>
        {isUpdateModalOpen && selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setUpdateModalOpen(false)}
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
                    onClick={() => setUpdateModalOpen(false)}
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
                  <input
                    type="text"
                    className="p-3 rounded-md text-black focus:outline-none"
                    placeholder="Client Name"
                    value={updateData.name}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, name: e.target.value })
                    }
                  />
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <span className="font-semibold">Email</span>
                  <input
                    type="text"
                    className="p-3 rounded-md text-black focus:outline-none"
                    placeholder="Client E-mail"
                    value={updateData.email}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, email: e.target.value })
                    }
                  />
                </div>

                {/* Contact */}
                <div className="grid gap-2">
                  <span className="font-semibold">Contact</span>
                  <input
                    type="text"
                    className="p-3 rounded-md text-black focus:outline-none"
                    placeholder="Contact"
                    value={updateData.contact}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, contact: e.target.value })
                    }
                  />
                </div>

                {/* Address */}
                <div className="grid gap-2">
                  <span className="font-semibold">Address</span>
                  <textarea
                    className="p-3 rounded-md text-black focus:outline-none"
                    placeholder="Address"
                    value={updateData.address}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, address: e.target.value })
                    }
                  />
                </div>

                {/* Client Category */}
                <div className="grid gap-2">
                  <span className="font-semibold">Client Category</span>
                  <select
                    onChange={(e) =>
                      setUpdateData({ ...updateData, category: e.target.value })
                    }
                    value={updateData.category}
                    className="p-3 rounded-md text-black focus:outline-none"
                  >
                    <option value="Loyal">Loyal</option>
                    <option value="Potential">Potential</option>
                    <option value="New">New</option>
                  </select>
                </div>

                {/* Add client Button */}
                <button
                  onClick={handleSubmitUpdate}
                  className="w-full font-semibold bg-green-600 rounded-md p-3 mt-2"
                >
                  Update client
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Client;
