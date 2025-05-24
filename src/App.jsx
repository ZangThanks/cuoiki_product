import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <div className="w-[1280px] ml-6 bg-white text-black p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
