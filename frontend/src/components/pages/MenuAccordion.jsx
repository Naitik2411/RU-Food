import React, { useState, useEffect, useCallback } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import selectDate from "@/store/dateStore";
import dayjs from "dayjs";
import mealTypeTabs from "@/store/mealTypeTabs";
import { useLocationStore } from "@/store/locationStore";
import { Utensils, Coffee } from "lucide-react";
import useFavoriteStore from "@/store/favoriteStore";

const MenuAccordion = ({ searchQuery = "" }) => {
  const [menuArray, setMenuArray] = useState([]);
  const { selectedDate } = selectDate();
  const { selectedMealType } = mealTypeTabs();
  const { selectedLocations } = useLocationStore();
  const {  toggleFavorites, isFavorite } = useFavoriteStore();
  
  const fetchMenus = useCallback(async () => {
    try {
      let allMenus = [];
      
      for (const location of selectedLocations) {
        const mealParam = selectedMealType === "All" ? "" : selectedMealType;
        const formattedDate = dayjs(selectedDate, "ddd MMM D YYYY").format(
          "YYYY-MM-DD"
        );
        
        let req = await fetch(
          `http://localhost:3000/menus/${location}/${mealParam}/${formattedDate}`
        );
        
        let menus = await req.json();
        
        if (menus?.menus?.menu) {
          allMenus.push({ location, menu: menus.menus.menu });
        }
      }
      
      setMenuArray(allMenus);
    } catch (err) {
      console.error("Error fetching menus:", err);
    }
  }, [selectedDate, selectedMealType, selectedLocations]);
  
  useEffect(() => {
    if (selectedDate && selectedLocations.length >= 0) {
      fetchMenus();
    }
  }, [fetchMenus, selectedDate, selectedLocations]);
  
  // Load favorites from localStorage on component mount

  const filterItem = (item) => {
    if (!searchQuery) return true;
    return item.itemName.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const accordionItems =
    menuArray.length > 0 ? (
      menuArray.map((locationData, index) => (
        <div
          key={index}
          className="flex flex-col items-center space-y-4 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-gray-100 rounded-xl py-6 w-full shadow-2xl border border-gray-500/10 hover:shadow-gray-900/10 transition-all"
        >
          <div className="flex items-center gap-3">
            <Utensils className="h-5 w-5 text-gray-400" />
            <h3 className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400 tracking-wide">
              {locationData.location}
            </h3>
          </div>
          <div className="w-full px-4">
            <Accordion type="multiple" collapsible className="w-full">
              {locationData.menu.map((subcategory, subIndex) => {
                const filteredItems = subcategory.items.filter(filterItem);
                if (filteredItems.length === 0) return null;
                return (
                  <AccordionItem
                    key={subIndex}
                    value={`item-${index}-${subIndex}`}
                    className="border-b border-gray-500/10 last:border-b-0"
                  >
                    <AccordionTrigger
                      className="px-4 py-3 text-gray-300 hover:text-gray-200 font-medium text-lg transition-colors shadow-sm hover:shadow-md"
                    >
                      {subcategory.subcategoryName}
                    </AccordionTrigger>
                    <AccordionContent className="overflow-hidden transition-all duration-300 px-6 text-gray-100/90 shadow-inner bg-gray-900/40">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4">
                        {filteredItems.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-all duration-200 border border-gray-700 relative group cursor-pointer"
                          >
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-gray-200">{item.itemName}</h4>
                              <Coffee
                                className={`w-5 h-5 transition-all duration-10 ${
                                  isFavorite(item, locationData.location)
                                    ? "fill-amber-900 text-amber-900"
                                    : "text-gray-400 group-hover:text-gray-200"
                                }`}
                                onClick={() => toggleFavorites(item, locationData.location)}
                              />
                            </div>
                            {item.description && (
                              <p className="text-sm text-gray-400 mt-2">{item.description}</p>
                            )}
                            {item.nutrition && (
                              <div className="mt-2 text-xs text-gray-500">
                                {item.nutrition}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      ))
    ) : (
      <div className="col-span-full flex flex-col items-center justify-center p-16 bg-gray-900/50 rounded-xl border border-gray-500/10">
        <p className="text-gray-200/60 italic text-lg">No menu available for this date.</p>
        <p className="text-gray-200/40 text-sm mt-2">Please select another date or location.</p>
      </div>
    );
  
  return (
    <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 px-6 md:px-10 max-w-7xl mx-auto">
      {accordionItems}
    </div>
  );
};

export default MenuAccordion;