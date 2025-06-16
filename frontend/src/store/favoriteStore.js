import { create } from "zustand";
import { db, auth } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const STORAGE_KEY = 'ru_food_favorites';

export const useFavoriteStore = create((set, get) => ({
  favorites: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),

  fetchFavorites: async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const docRef = doc(db, "favorites", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const favorites = docSnap.data().items || [];
        set({ favorites });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } else {
        set({ favorites: [] });
        localStorage.setItem(STORAGE_KEY, '[]');
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      // If there's an error, try to use cached data
      const cachedFavorites = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      set({ favorites: cachedFavorites });
    }
  },

  toggleFavorites: async (item, location) => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, "favorites", user.uid);
    const itemWithLocation = { ...item, location };
    const state = get();

    // Check if this item is already a favorite
    const isFavorite = state.favorites.some(
      (fav) =>
        fav.itemName === itemWithLocation.itemName &&
        fav.location === itemWithLocation.location
    );

    try {
      // Optimistically update local state and localStorage
      const newFavorites = isFavorite
        ? state.favorites.filter(
            (fav) =>
              !(
                fav.itemName === itemWithLocation.itemName &&
                fav.location === itemWithLocation.location
              )
          )
        : [...state.favorites, itemWithLocation];

      set({ favorites: newFavorites });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));

      // Then update Firestore
      await updateDoc(docRef, {
        items: isFavorite
          ? arrayRemove(itemWithLocation)
          : arrayUnion(itemWithLocation),
      });
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      // If there's an error, revert to the previous state
      const previousFavorites = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      set({ favorites: previousFavorites });
    }
  },

  isFavorite: (item, location) => {
    return get().favorites.some(
      (fav) => fav.itemName === item.itemName && fav.location === location
    );
  },

  // Clear favorites from localStorage when user logs out
  clearFavorites: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ favorites: [] });
  },
}));

export default useFavoriteStore;
