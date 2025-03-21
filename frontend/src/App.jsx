import MenuAccordion from "./components/pages/MenuAccordion";
import Navbar from "./components/pages/Navbar";
import MealTabs from "./components/pages/MealTabs";
import LocationDrawer from "./components/pages/LocationDrawer";
import Manager from "./components/pages/Manager";
import "./App.css";
import { DatePicker } from "./components/pages/DatePicker";

function App() {
  return (
    <>
      <div className=" min-h-screen">
        <Manager/>  
      </div>
    </>
  );
}

export default App;
