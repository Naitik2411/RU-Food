import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Manager from "./components/pages/Manager";
import Favorites from "./components/pages/Favorites";
import useAuthStore from "./store/authStore";
import "./App.css";


// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Manager />} />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
