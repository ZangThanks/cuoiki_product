import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./productSlice";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <p>List</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full grid grid-cols-4 gap-4">
          {list.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
