import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import ProductList from "../features/ProductList";
import ListWithHook from "../hooks/ListWithHook";
import LoadingSpinner from "../components/LoadingSpinner";

function Home() {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [pName, setPName] = useState("");
  const [sorted, setSorted] = useState(false);

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

  const handleFind = (e) => {
    setPName(e.target.value);
    if (pName.trim() === "") {
      setFilterProducts([]);
    } else {
      const filterProducts = products.filter((item) =>
        item.name.toLowerCase().includes(pName.toLowerCase())
      );
      setFilterProducts(filterProducts);
    }
  };

  const handleSort = () => {
    setSorted(!sorted);
    const sortedProducts = [...products].sort((a, b) => {
      return sorted ? a.price - b.price : b.price - a.price;
    });
    setProducts(sortedProducts);
  };

  const handleSortWithRadio = (e) => {
    const value = e.target.value;
    const sortedProducts = [...products].sort((a, b) => {
      if (value === "price-asc") {
        return a.price - b.price;
      } else if (value === "price-desc") {
        return b.price - a.price;
      } else if (value === "name-asc") {
        return a.name.localeCompare(b.name);
      } else if (value === "name-desc") {
        return b.name.localeCompare(a.name);
      }
    });
    setProducts(sortedProducts);
  };

  return (
    <div className="w-full flex flex-col items-start justify-center p-4">
      <button
        className="bg-green-400 text-white mb-4"
        onClick={() => navigate("/add")}
      >
        Add Product
      </button>
      <button className="bg-yellow-400 text-white mb-4" onClick={handleSort}>
        Sort
      </button>
      <div className="p-1 mb-2">
        <p className="text-bold text-xl">Sort</p>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            Price (Low to High)
            <input
              type="radio"
              value="price-asc"
              name="radio-sort"
              onChange={handleSortWithRadio}
            />
          </label>
          <label className="flex items-center gap-2">
            Price (High to Low)
            <input
              type="radio"
              value="price-desc"
              name="radio-sort"
              onChange={handleSortWithRadio}
            />
          </label>
          <label className="flex items-center gap-2">
            Name (A - Z)
            <input
              type="radio"
              value="name-asc"
              name="radio-sort"
              onChange={handleSortWithRadio}
            />
          </label>
          <label className="flex items-center gap-2">
            Name (Z - A)
            <input
              type="radio"
              value="name-desc"
              name="radio-sort"
              onChange={handleSortWithRadio}
            />
          </label>
        </div>
      </div>
      <input
        type="text"
        value={pName}
        onChange={handleFind}
        placeholder="Find product name ..."
        className="w-[400px] text-white rounded-lg p-2"
      />
      <p className="text-3xl text-bold mb-2">
        Products {sorted ? "Price Des" : "Price Ins"}
      </p>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full grid grid-cols-4 gap-4">
          {pName.trim() === "" ? (
            products.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))
          ) : filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))
          ) : (
            <p>Not found</p>
          )}
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
