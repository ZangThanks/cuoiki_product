import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../features/productSlice";

function ProductCard({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRemove = async () => {
    try {
      const res = await fetch(
        `https://67deba96471aaaa742856ccc.mockapi.io/data/v1/Customers/${item.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete the product");
      }
      dispatch(fetchProducts());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-200 p-4 text-black rounded-lg flex flex-col items-start justify-center">
      <p className="text-bold">{item.name}</p>
      <p>${item.price}</p>
      <button
        className="bg-yellow-400 text-white mt-2"
        onClick={() => navigate(`/product/${item.id}`)}
      >
        Detail
      </button>
      <div className="w-full flex justify-between items-center">
        <button
          onClick={() => navigate(`/edit/${item.id}`)}
          className="bg-blue-300 text-white mt-4"
        >
          Edit Product
        </button>
        <button className="bg-red-500 text-white mt-4" onClick={handleRemove}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
