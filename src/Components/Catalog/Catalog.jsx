import "./Catalog.scss";
import { useEffect, useState } from "react";
import React from "react";

export default function () {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = () => {
      setLoading(true);
      return fetch("http://localhost:3001/products").then((response) => {
        setLoading(false);
        return response.json();
      });
    };
    fetchProducts().then((result) => {
      setProduct(result);
    });
  }, []);

  return (
    <div className="main-area">
      <h2>Бургеры</h2>
      <div className="product_list">
        {loading && <h2>Внимание, загрузка!</h2>}
        {product.map((element, index) => {
          return (
            <div className="goods" key={index}>
              <img src={element.photo} alt="" />
              <p>{element.price}₽</p>
              <p>{element.title}</p>
              <p>{element.weight}</p>
              <button>Добавить</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
