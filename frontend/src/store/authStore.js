import { create } from "zustand";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";


export const useAuthStore = create((set) => ({
  user: null,


  signIn: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      set({ user: result.user });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  },


  signOut: async () => {
    try {
      await signOut(auth);
      set({ user: null });
    } catch (error) {
      console.error("Sign-Out Error:", error);
    }
  },


  initAuth: () => {                      //prevents loss of user data on page refresh
    onAuthStateChanged(auth, (user) => {
      set({ user });
    });
  },
}));

export default useAuthStore;
