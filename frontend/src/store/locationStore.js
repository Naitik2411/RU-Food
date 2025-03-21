import { create } from "zustand";

export const useLocationStore = create((set) => ({
  locations: ["Neilson Dining Hall", "Busch Dining Hall", "Livingston Dining Hall", "The Atrium", "All"],
  selectedLocations: [],

  setLocations: (location) =>
    set((state) => {
      if (location === "All") {
        return {
          selectedLocations:
            state.selectedLocations.includes("All") || state.selectedLocations.length === state.locations.length - 1
              ? []
              : state.locations,
        };
      }

      const newSelectedLocations = state.selectedLocations.includes(location)
        ? state.selectedLocations.filter((loc) => loc !== location)
        : [...state.selectedLocations, location];

      return {
        selectedLocations: newSelectedLocations.includes("All") ? state.locations : newSelectedLocations,
      };
    }),

  clearLocations: () => set(() => ({ selectedLocations: [] })),
}));
