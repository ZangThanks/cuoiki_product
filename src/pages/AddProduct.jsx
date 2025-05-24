import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const [item, setItem] = useState({
    id: "",
    name: "",
    price: 0,
    description: "",
    image: "../milk.jpg",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://67deba96471aaaa742856ccc.mockapi.io/data/v1/Customers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to add product!!!!!");
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-start items-center gap-2">
        <a href="" onClick={() => navigate("/")}>
          Back
        </a>
        <p className="text-bold text-2xl">Add product page</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter product name..."
          name="name"
          value={item.name}
          onChange={handleChange}
          className="p-2 rounded-lg text-white"
        />
        <input
          type="number"
          placeholder="Enter product price"
          name="price"
          value={item.price}
          onChange={handleChange}
          className="p-2 rounded-lg text-white"
        />
        <input
          type="text"
          placeholder="Enter description"
          name="description"
          value={item.description}
          onChange={handleChange}
          className="p-2 rounded-lg text-white"
        />
        <div className="flex gap-4">
          <button className="bg-green-400 text-white h-10">Submit</button>
          <button className="bg-red-400 text-white h-10">Clean</button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
