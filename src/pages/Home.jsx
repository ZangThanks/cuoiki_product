import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        await fetch(
          "https://67deba96471aaaa742856ccc.mockapi.io/data/v1/Customers"
        )
          .then((res) => res.json())
          .then((data) => setProducts(data));
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <button
        className="bg-green-400 text-white mb-4"
        onClick={() => navigate("/add")}
      >
        Add Product
      </button>
      <p className="text-3xl text-bold mb-2">Products</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {products.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
