import './App.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import ServiceDetails from "./pages/ServiceDetails/serviceDetails";
import Header from "./components/Header/header";
import CategoryPage from "./pages/Categories/categories";
import CategoriesDetails from "./pages/CategoriesDetails/categoriesDetails";
import CreateStore from "./pages/CreateStore/createStore";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service-details" element={<ServiceDetails />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/category-details/:id" element={<CategoriesDetails   />} />
        <Route path="/create-store" element={<CreateStore   />} />
      </Routes>
    </Router>
  );
}

export default App;
