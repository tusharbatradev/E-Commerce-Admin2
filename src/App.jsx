import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [product, setProduct] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    rating: "",
    image: "",
  });
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const formattedProduct = {
      ...product,
      id: parseInt(product.id),
      price: parseFloat(product.price),
      rating: parseInt(product.rating),
    };

    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedProduct),
      });

      if (response.ok) {
        setMessage("Product added successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const products = await response.json(); 
      setData(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); 

  return (
    <>
      <div className="input-section">
        <p>Add Your Product Here:-</p>
        <input
          type="number"
          name="id"
          placeholder="id"
          value={product.id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          placeholder="title"
          value={product.title}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="price"
          value={product.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          value={product.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="category"
          value={product.category}
          onChange={handleChange}
        />
        <input
          type="number"
          name="rating"
          placeholder="rating"
          value={product.rating}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="image"
          value={product.image}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>SUBMIT</button>

        <h1>{message}</h1>
      </div>

      <div>
        <h1>Added Products</h1>
        <ul className="product-list">
          {data.map((item) => (
            <li className="product" key={item.id}>
              <h3>ID = {item.id}</h3>
              <img width={"200px"} height={"250px"} src={item.image} />
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
