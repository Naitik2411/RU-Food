import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import mealTypeTabs from "@/store/mealTypeTabs";
import React from "react";

const MealTabs = () => {
  const { selectedMealType, setSelectedMealType } = mealTypeTabs();
  
  return (
    <div className="w-full flex justify-center py-4">
      <Tabs
        value={selectedMealType}
        onValueChange={setSelectedMealType}
        className="w-full max-w-2xl" // Reduced from max-w-3xl to max-w-2xl
      >
        <TabsList className="bg-gradient-to-r from-gray-900 to-black border border-gray-700/30 shadow-md w-full grid grid-cols-5 gap-0.5 p-0.5"> {/* Reduced gap and padding */}
          <TabsTrigger
            value="Breakfast"
            className="text-gray-300 text-sm px-2 data-[state=active]:bg-gray-800/50 data-[state=active]:text-gray-200 data-[state=active]:shadow-md hover:text-gray-300 transition-all"
          > {/* Added text-sm and px-2 to reduce tab width */}
            Breakfast
          </TabsTrigger>
          <TabsTrigger
            value="Lunch"
            className="text-gray-300 text-sm px-2 data-[state=active]:bg-gray-800/50 data-[state=active]:text-gray-200 data-[state=active]:shadow-md hover:text-gray-300 transition-all"
          >
            Lunch
          </TabsTrigger>
          <TabsTrigger
            value="Knight Room"
            className="text-gray-300 text-sm px-2 data-[state=active]:bg-gray-800/50 data-[state=active]:text-gray-200 data-[state=active]:shadow-md hover:text-gray-300 transition-all"
          >
            Knight Room
          </TabsTrigger>
          <TabsTrigger
            value="Dinner"
            className="text-gray-300 text-sm px-2 data-[state=active]:bg-gray-800/50 data-[state=active]:text-gray-200 data-[state=active]:shadow-md hover:text-gray-300 transition-all"
          >
            Dinner
          </TabsTrigger>
          <TabsTrigger
            value="Late NIght"
            className="text-gray-300 text-sm px-2 data-[state=active]:bg-gray-800/50 data-[state=active]:text-gray-200 data-[state=active]:shadow-md hover:text-gray-300 transition-all"
          >
            Late Night
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default MealTabs;