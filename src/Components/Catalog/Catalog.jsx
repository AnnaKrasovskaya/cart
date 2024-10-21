import "./Catalog.scss";
import React from "react";
import Product from "./Product/Product";

export default function ({ products, setCartStatus }) {
  return (
    <div className="main-area">
      <h2>Бургеры</h2>
      <div className="product_list">
        {products.map((element, index) => (
          <Product
            setCartStatus={setCartStatus}
            element={element}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
