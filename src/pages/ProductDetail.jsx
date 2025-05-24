import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      await fetch(
        `https://67deba96471aaaa742856ccc.mockapi.io/data/v1/Customers/${id}`
      )
        .then((res) => res.json())
        .then((data) => setProduct(data));
    };

    fetchProduct();
  }, [id]);

  console.log(product);

  return (
    <div className="flex items-center justify-start gap-4">
      <div className="flex flex-col items-start justify-center gap-2">
        <p className="text-bold text-3xl border-b-black">{product.name}</p>
        <img src={product.image} />
      </div>
      <div className="flex flex-col items-start justify-center gap-2">
        <p>${product.price}</p>
        <p>{product.description}</p>
      </div>
    </div>
  );
}

export default ProductDetail;
