import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Product from "./pages/Product";
import DeleteProduct from "./pages/DeleteProduct";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/product/delete/:id" element={<DeleteProduct />} />
        <Route path="/product/addproduct" element={<AddProduct />} />
        <Route path="/product/update/:id" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
