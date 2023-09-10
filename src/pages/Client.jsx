import { useEffect, useState } from "react";
import ClientModal from "../components/ClientModal";
import axios from "axios";

const Client = () => {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    const getClients = async () => {
      try {
        const response = await axios.get("http://localhost:8000/clients");
        if (response.status === 200) {
          setClients(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getClients();
  }, []);
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
        />
        <button className="text-black p-3 rounded-full hover:bg-gray-300 m-1 transition-all transform duration-200">
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

      <ClientModal />
      <div className="rounded-xl bg-[#2b2b2b] p-4 grid w-full">
        {clients.map((item, index) => (
          <div
            key={index}
            className="grid w-full md:border-none border-b grid-cols-1 md:grid-cols-5"
          >
            <div>{item.name}</div>
            <div>{item.email}</div>
            <div>{item.contact}</div>
            <div>{item.address}</div>
            <div>{item.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Client;
