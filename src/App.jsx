import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import { Provider } from "react-redux";
import store from "../store";

function App() {
  return (
    <div className="w-[1280px] ml-6 bg-white text-black p-4">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
