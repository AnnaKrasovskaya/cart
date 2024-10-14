import "./Catalog.scss";
import { useState } from "react";
import React from "react";
import productData from "../../data/product";

export default function () {
  const [product, setProduct] = useState(productData);
  return (
    <div className="main-area">
      <h2>Бургеры</h2>
      <div className="product_list">
        {product.map((element, index) => {
          return (
            <div className="goods">
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
