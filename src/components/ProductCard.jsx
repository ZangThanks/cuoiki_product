import { useNavigate } from "react-router-dom";

function ProductCard({ item }) {
  const navigate = useNavigate();

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
      <button
        onClick={() => navigate(`/edit/${item.id}`)}
        className="bg-blue-300 text-white mt-4"
      >
        Edit Product
      </button>
    </div>
  );
}

export default ProductCard;
