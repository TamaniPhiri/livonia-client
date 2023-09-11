/* eslint-disable react/prop-types */
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const ClientModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="grid place-content-center mt-4">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-600 font-semibold p-3 mt-2 rounded-md"
      >
        Add Client
      </button>
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

const SpringModal = ({ isOpen, setIsOpen }) => {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const createClient = async () => {
    try {
      const response = await axios.post("http://localhost:8000/clients", {
        name: clientName,
        email,
        contact,
        address,
        category,
      });
      if(response.status===200){
        alert("CLient Created Successfully")
        setIsOpen(false)
        window.location.href='/client'
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
                <input
                  type="text"
                  className="p-3 rounded-md text-black focus:outline-none"
                  placeholder="Client Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <span className="font-semibold">Email</span>
                <input
                  type="text"
                  className="p-3 rounded-md text-black focus:outline-none"
                  placeholder="Client E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Contact */}
              <div className="grid gap-2">
                <span className="font-semibold">Contact</span>
                <input
                  type="text"
                  className="p-3 rounded-md text-black focus:outline-none"
                  placeholder="Contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>

              {/* Address */}
              <div className="grid gap-2">
                <span className="font-semibold">Address</span>
                <textarea
                  className="p-3 rounded-md text-black focus:outline-none"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* Client Category */}
              <div className="grid gap-2">
                <span className="font-semibold">Client Category</span>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  className="p-3 rounded-md text-black focus:outline-none"
                >
                  <option value="Loyal">Loyal</option>
                  <option value="Potential">Potential</option>
                  <option value="New">New</option>
                </select>
              </div>

              {/* Add client Button */}
              <button onClick={createClient} className="w-full font-semibold bg-green-600 rounded-md p-3 mt-2">
                Add client
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClientModal;
