import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import ProductList from "../features/ProductList";
import ListWithHook from "../hooks/ListWithHook";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await fetch("http://localhost:3001/users")
          .then((res) => res.json())
          .then((data) => setUsers(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
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
      <div>
        <p className="text-bold text-3xl">Product with Redux</p>
        <ProductList />
      </div>
      <div>
        <p className="text-bold text-3xl">Product with useFetch</p>
        <ListWithHook />
      </div>
      <div>
        <p className="text-bold text-3xl">User with JsonServer</p>
        <div className="flex flex-col gap-2">
          {users.map((user, index) => (
            <div key={index}>
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
