import { create } from "zustand";
import { db, auth, doc, setDoc, getDoc, updateDoc } from "@/firebase/firebaseConfig";

export const useFavoriteStore = create((set, get) => ({
    favorites : [],

    fetchFavorites: async () => {
        const user = auth.currentUser;
        if (!user) return

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            set({ favorites: docSnap.data().items });
        } else {
            set({ favorites: [] });
        }
    },

    toggleFavorites: async (item, location) => {
        const user = auth.currentUser;
        if (!user) return

        const docRef = doc(db, "favorites", user.uid);
        const docSnap = await getDoc(docRef);
        const state = get();
        const itemWithLocation = {...item, location};
        const itemId = `${location}-${item.itemName}`

        let newFavorite;
        const isAlreadyFavorite = state.favorites.some(fav => `${fav.location}-${fav.itemName}` === itemId);

        if(isAlreadyFavorite){
            newFavorite = state.favorites.filter(fav => `${fav.location}-${fav.itemName}` !== itemId)
        } else {
            newFavorite = [...state.favorites, itemWithLocation]
        }
        if (docSnap.exists()) {
            await updateDoc(docRef, { items: newFavorite });
          } else {
            await setDoc(docRef, { items: newFavorite });
          }

    // Update Zustand store
    set({ favorites: newFavorite });
  },

  isFavorite: (item, location) => {
    const itemId = `${location}-${item.itemName}`;
    return get().favorites.some(fav => `${fav.location}-${fav.itemName}` === itemId);
    }
}));

export default useFavoriteStore;