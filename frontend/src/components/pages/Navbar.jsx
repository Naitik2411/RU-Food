import React, { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  return (
    <>
      <nav className="flex justify-between items-center bg-gradient-to-r from-gray-900 to-black text-white px-6 md:px-8 py-4 shadow-lg border-b border-gray-700/30 sticky top-0 z-50">
        {/* Left Side: RU Food & Burger Icon */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <span className="text-2xl flex items-center">🍔</span>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-2xl font-bold tracking-wide flex items-center">
            <span className="text-gray-400">RU</span>
            <span className="text-white ml-1">Food</span>
          </h1>
        </div>

        {/* Right Side: Menu Items */}
        <div className="flex items-center space-x-6">
          <div className="w-[30px] h-[30px] cursor-pointer flex items-center hover:scale-110 transition-transform duration-300">
            <lord-icon
              src="https://cdn.lordicon.com/wjyqkiew.json"
              trigger="hover"
              colors="primary:#d9d9d9,secondary:#b3b3b3"
              style={{ width: "28px", height: "28px" }}
            ></lord-icon>
          </div>
          <button
            onClick={toggleLoginModal}
            className="text-lg font-medium text-gray-100 hover:text-gray-300 transition-colors duration-300 relative group"
          >
            Login
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-500 to-gray-400 group-hover:w-full transition-all duration-300"></span>
          </button>
          <a
            href="#"
            className="text-lg font-medium text-gray-100 hover:text-gray-300 transition-colors duration-300 relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-500 to-gray-400 group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>
      </nav>

      {/* Render Login Modal as a separate component */}
      {showLoginModal && <LoginModal onClose={toggleLoginModal} />}
    </>
  );
};

export default Navbar;