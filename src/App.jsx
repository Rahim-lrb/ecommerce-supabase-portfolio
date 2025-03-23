import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PromoBar from "./components/PromoBar";
import Register from "./pages/Register"
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import Category from "./pages/Category";


import AllProducts from "./pages/AllProducts";
import CartPage from "./pages/Cart";


function App() {
  return (
    <div>      
      <PromoBar/>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/category/:categoryName" element={<Category />} />

        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<CartPage />} />


        <Route path="/products" element={<AllProducts />} />
        {/* <Route path="/products/category/:categoryName" element={<CategoryPage />} /> */}
        {/* <Route path="/products/sale/:saleType" element={<SalePage />} /> */}
        {/* <Route path="/product/:productId" element={<ProductDetails />} /> */}


        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
