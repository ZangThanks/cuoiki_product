import ProductCard from "../components/ProductCard";
import useFetch from "./useFetch";

function ListWithHook() {
  const { data, loading, error } = useFetch(
    "https://67deba96471aaaa742856ccc.mockapi.io/data/v1/Customers"
  );

  return (
    <div>
      <p>List</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full grid grid-cols-4 gap-4">
          {data.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListWithHook;
