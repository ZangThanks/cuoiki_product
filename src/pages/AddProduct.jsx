import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalAnounce from "../components/ModalAnounce";

function AddProduct() {
  const navigate = useNavigate();
  //const [maxId, setMaxId] = useState(0);
  const [item, setItem] = useState({
    id: "",
    name: "",
    price: 0,
    description: "",
    image: "../milk.jpg",
  });
  const [isOpen, setIsOpen] = useState(false);

  //   useEffect(() => {
  //     const fetchMaxId = async () => {
  //       try {
  //         const res = await fetch(
  //           "https://67deba96471aaaa742856ccc.mockapi.io/data/v1/Customers"
  //         );
  //         const data = await res.json();
  //         const maxId = Math.max(...data.map((item) => item.id));
  //         setMaxId(maxId);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchMaxId();
  //   }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //item.id = maxId + 1;
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
      setIsOpen(true);
    } catch (error) {
      setIsOpen(true);
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

  const handleClose = () => {
    setIsOpen(false);
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-4">
      {isOpen ? (
        <ModalAnounce
          content="Added product successfull!"
          handleClose={handleClose}
        />
      ) : (
        <div></div>
      )}
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
          <button type="button" className="bg-red-400 text-white h-10">
            Clean
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
