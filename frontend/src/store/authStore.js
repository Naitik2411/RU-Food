import { create } from "zustand";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";


export const useAuthStore = create((set) => ({
  user: null,
  loading: true, // Track loading state
  error: null,   // Track authentication errors

  signIn: async () => {
    set({ loading: true, error: null }); // Start loading
    try {
      const result = await signInWithPopup(auth, googleProvider);
      set({ user: result.user, loading: false });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      set({ error: error.message, loading: false });
    }
  },

  signOut: async () => {
    set({ loading: true, error: null }); // Start loading
    try {
      await signOut(auth);
      set({ user: null, loading: false });
    } catch (error) {
      console.error("Sign-Out Error:", error);
      set({ error: error.message, loading: false });
    }
  },

  initAuth: () => {
    onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });
  },
}));

export default useAuthStore;


