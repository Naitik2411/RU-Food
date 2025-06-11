import React, { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import LoginModal from "./LoginModal";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef(null);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  // Focus input when search bar is shown
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  // Hide search bar on Escape or click outside
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") setShowSearch(false);
    }
    function handleClickOutside(e) {
      if (searchInputRef.current && !searchInputRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    }
    if (showSearch) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  return (
    <>
      <nav className="flex justify-between items-center bg-gradient-to-r from-gray-900 to-black text-white px-6 md:px-8 py-4 shadow-lg border-b border-gray-700/30 sticky top-0 z-50 relative">
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
        {/* Center: Search Bar */}
        <div className="flex-1 flex justify-center items-center absolute left-0 right-0 mx-auto pointer-events-none">
          {showSearch && (
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 pointer-events-auto"
              placeholder="Search menu items..."
              style={{ zIndex: 60 }}
            />
          )}
        </div>
        {/* Right Side: Menu Items */}
        <div className="flex items-center space-x-6">
          {/* Search Button */}
          <div
            className="w-[30px] h-[30px] cursor-pointer flex items-center hover:scale-110 transition-transform duration-300"
            onClick={() => setShowSearch(s => !s)}
            title="Search"
          >
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

      {showLoginModal && <LoginModal onClose={toggleLoginModal} />}
    </>
  );
};

export default Navbar;