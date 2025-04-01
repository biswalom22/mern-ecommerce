import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import ProductDetails from "./pages/ProductDetail";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./context/AuthContext";
import PaymentCancel from "./pages/PaymentCancell";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import PaymentSuccess from "./pages/PaymentSuccess";
import ProductList from "./pages/ProductList";
import Header from "./components/Header";
 
const App: React.FC = () => {
   return (
    <AuthProvider>
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="payment/success" element={<PaymentSuccess />} />
          <Route path="payment/failure" element={<PaymentCancel />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </CartProvider>
    </AuthProvider>
  );
};

export default App;
