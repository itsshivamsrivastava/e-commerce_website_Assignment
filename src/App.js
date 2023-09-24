import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginSignup from './components/LoginSignup/LoginSignup';
import ProductsGallery from './components/products/ProductsGallery';
import SingleProduct from './components/products/SingleProduct';
import Navbar from './components/Header/Navbar';
import Checkout from './components/products/Checkout';

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginSignup />} />
          
          <Route exact path="/productsGallery" element={<ProductsGallery />} />
          
          <Route exact path="/singleProduct" element={<SingleProduct />} />

          <Route exact path="/singleProduct/:id" element={<SingleProduct />} />

          <Route exact path="/checkout" element={<Checkout />} />
          
          <Route exact path="/checkout/:id" element={<Checkout />} />
          
        </Routes>

      </Router>
    </>
  );
}

export default App;
