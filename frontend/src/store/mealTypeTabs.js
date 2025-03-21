import {create} from 'zustand'


const now = new Date();
const hours = now.getHours();
const isBreakfast = hours >= 5 && hours < 11;
const isLunch = hours >= 11 && hours <= 16;
const mealTypeTabs = create((set) => ({
    selectedMealType: isBreakfast ? "Breakfast" : isLunch ? "Lunch" : "Dinner",
    setSelectedMealType: (mealType) => set({selectedMealType: mealType}),
}));
export default mealTypeTabs;