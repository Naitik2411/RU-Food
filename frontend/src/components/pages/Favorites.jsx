import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import useFavoriteStore from "@/store/favoriteStore";
import { Heart, MapPin, ArrowLeft } from "lucide-react";

const Favorites = () => {
  const { user } = useAuthStore();
  const { favorites, fetchFavorites } = useFavoriteStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    fetchFavorites();
  }, [user, fetchFavorites, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-gray-900/80 to-black/80 p-6 rounded-xl border border-gray-700/30 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200">
                My Favorites
              </h1>
            </div>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-black text-white rounded-lg hover:from-gray-700 hover:to-gray-900 transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </button>
          </div>

          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">You haven't added any favorites yet.</p>
              <button
                onClick={() => navigate("/")}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-gray-800 to-black text-white rounded-lg hover:from-gray-700 hover:to-gray-900 transition-colors duration-300"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30 hover:border-gray-600/50 transition-colors duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.itemName}</h3>
                      <div className="flex items-center gap-2 mt-2 text-gray-400">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                    <Heart className="h-5 w-5 text-red-500" />
                  </div>
                  {item.description && (
                    <p className="mt-2 text-gray-400 text-sm">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites; 