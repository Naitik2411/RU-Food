import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useLocationStore } from "@/store/locationStore";
import { MapPinIcon } from "lucide-react";

const locations = ["Neilson Dining Hall", "Busch Dining Hall", "Livingston Dining Hall", "The Atrium", "All"];

const LocationDrawer = () => {
  const [open, setOpen] = useState(false);
  const { selectedLocations, setLocations, clearLocations } = useLocationStore();
  
  useEffect(() => {
    setOpen(true);
  }, []);
  
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="bg-gradient-to-r from-gray-900 to-black text-white border border-gray-700/30 hover:text-gray-200 hover:bg-black hover:border-gray-600/50 shadow-md flex items-center gap-2 px-4 py-6 font-medium transition-all duration-300"
        >
          <MapPinIcon className="w-5 h-5" />
          Select Location
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-700/40 max-h-[60vh]">
        <div className="max-h-[60vh] overflow-y-auto">
          <DrawerHeader className="border-b border-gray-700/20 pb-2 pt-3">
            <DrawerTitle className="text-white text-lg">Select Your Location</DrawerTitle>
            <DrawerDescription className="text-gray-400 text-sm">Choose where you'd like to see menus.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            {locations.map((location, index) => (
              <label
                key={index}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/10 transition-colors cursor-pointer"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    value={location}
                    onChange={() => setLocations(location)}
                    checked={selectedLocations.includes(location)}
                    className="w-4 h-4 border-2 border-gray-400 rounded text-gray-600 focus:ring-gray-500 cursor-pointer"
                  />
                  {selectedLocations.includes(location) && (
                    <div className="absolute -right-1 -top-1 w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  )}
                </div>
                <span className="text-gray-200">{location}</span>
              </label>
            ))}
          </div>
          <DrawerFooter className="border-t border-gray-700/20 pt-2 pb-3 flex flex-row justify-end space-x-3 space-y-0">
            <DrawerClose asChild>
              <Button
                onClick={clearLocations}
                className="bg-transparent text-gray-300 hover:text-gray-200 border border-gray-700/40 hover:border-gray-600 py-2 h-auto text-sm"
                variant="outline"
              >
                Clear All
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button
                className="bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-600 hover:to-gray-700 shadow-lg border-none py-2 h-auto text-sm"
                onClick={() => setOpen(false)}
              >
                Done
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default LocationDrawer;