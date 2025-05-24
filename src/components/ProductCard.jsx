import { useNavigate } from "react-router-dom";

function ProductCard({ item }) {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-200 p-4 text-black rounded-lg flex flex-col items-start justify-center">
      <p className="text-bold">{item.name}</p>
      <p>${item.price}</p>
      <button
        className="bg-yellow-400 text-white mt-2 h-10"
        onClick={() => navigate(`/product/${item.id}`)}
      >
        Detail
      </button>
    </div>
  );
}

export default ProductCard;
