import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const [item, setItem] = useState({
    id: "",
    name: "",
    price: 0,
    description: "",
    image: "../milk.jpg",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await fetch(
          `https://67deba96471aaaa742856ccc.mockapi.io/data/v1/Customers/${id}`
        )
          .then((res) => res.json())
          .then((data) => setItem(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://67deba96471aaaa742856ccc.mockapi.io/data/v1/Customers/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to edit product!!!!");
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(item);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-start items-center gap-2">
        <a href="" onClick={() => navigate("/")}>
          Back
        </a>
        <p className="text-bold text-3xl">Edit product</p>
      </div>
      <form onSubmit={handleEdit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Enter product name"
          value={item.name}
          className="p-2 rounded-lg text-white"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="price"
          placeholder="Enter product name"
          value={item.price}
          className="p-2 rounded-lg text-white"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="description"
          placeholder="Enter product name"
          value={item.description}
          className="p-2 rounded-lg text-white"
          onChange={handleChange}
        ></input>
        <div>
          <button className="bg-green-400 text-white h-10">Edit</button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
