import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Detaisofproduct from "./component/Detaisofproduct";
import Homepage from "./component/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import CartPage from "./component/CartPage";
import ProductListing from "./pages/ProductListing";
// import { Navbar } from 'react-bootstrap';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product-detail" element={<Detaisofproduct />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />

        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
