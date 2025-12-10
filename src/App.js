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
import Footer from './components/Footer/footer';

function App() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ flex: 1 }}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service-details" element={<ServiceDetails />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/category-details/:id" element={<CategoriesDetails />} />
            <Route path="/create-store" element={<CreateStore />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
