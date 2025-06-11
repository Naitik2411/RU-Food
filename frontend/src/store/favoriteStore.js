import { create } from "zustand";
import { db, auth } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export const useFavoriteStore = create((set, get) => ({
  favorites: [],

  fetchFavorites: async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, "favorites", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      set({ favorites: docSnap.data().items || [] });
    } else {
      set({ favorites: [] });
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
      await updateDoc(docRef, {
        items: isFavorite
          ? arrayRemove(itemWithLocation)
          : arrayUnion(itemWithLocation),
      });

      // Optimistically update Zustand store
      set({
        favorites: isFavorite
          ? state.favorites.filter(
              (fav) =>
                !(
                  fav.itemName === itemWithLocation.itemName &&
                  fav.location === itemWithLocation.location
                )
            )
          : [...state.favorites, itemWithLocation],
      });
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  },

  isFavorite: (item, location) => {
    return get().favorites.some(
      (fav) => fav.itemName === item.itemName && fav.location === location
    );
  },
}));

export default useFavoriteStore;
