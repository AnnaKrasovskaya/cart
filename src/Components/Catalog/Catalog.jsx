import "./Catalog.scss";
import React, {useEffect, useState} from "react";
import Product from "./Product/Product";
import {collectAllProducts} from "../../services/collectAllProducts.js";
import {useParams} from "react-router-dom";
import DB from "../../services/DB";

export default function ({setCart, cart}) {
  const {slug} = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});

  useEffect(() => {
    DB.getCategoriesById(slug).then((result) => {
      if (slug) {
        setCategory(result)
        setProducts(result.products)
      } else {
        setCategory({title: 'Все товары'})
        setProducts(collectAllProducts(result))
      }
    })
  }, [slug])

  return (
    <div className="main-area">
      <h2>{category.title}</h2>
      <div className="product_list">
        {products.map((element, index) => (
          <Product
            setCart={setCart}
            element={element}
            key={index}
            cart={cart}
          />
        ))}
      </div>
    </div>
  );
}
