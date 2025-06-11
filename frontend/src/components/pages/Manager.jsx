import React, { useState } from "react";
import MealTabs from "./MealTabs";
import { DatePicker } from "./DatePicker";
import MenuAccordion from "./MenuAccordion";
import LocationDrawer from "./LocationDrawer";
import Navbar from "./Navbar";
import { Calendar, Coffee } from "lucide-react";

const Manager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Navbar */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {/* Main Content */}
      <main className="py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with Controls */}
          <div className="w-full px-6 md:px-10 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-gray-900/80 to-black/80 p-4 rounded-xl border border-gray-700/30 shadow-lg">
              <div className="flex items-center gap-3">
                <Coffee className="h-8 w-8 text-gray-400" />
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200">
                  Dining Dashboard
                </h1>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex items-center gap-2 bg-gray-900/70 p-1 rounded-lg border border-gray-500/30 shadow-lg">
                  <Calendar className="h-5 w-5 ml-2 text-gray-400" />
                  <DatePicker />
                </div>
                
                <LocationDrawer />
              </div>
            </div>
          </div>
          
          {/* Meal Type Tabs */}
          <MealTabs />
          
          {/* Description */}
          <div className="text-center mb-8 px-6">
            <p className="text-gray-200/80 font-light italic">
              Explore our curated dining options across campus
            </p>
          </div>
          
          {/* Menu Accordion */}
          <div className="pb-16">
            <MenuAccordion searchQuery={searchQuery} />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 border-t border-gray-500/20 text-center text-gray-300/60 text-sm">
        <p>© {new Date().getFullYear()} Just For Fun!</p>
      </footer>
      
      {/* Script for Lordicon */}
      <script src="https://cdn.lordicon.com/lordicon.js"></script>
    </div>
  );
};

export default Manager;