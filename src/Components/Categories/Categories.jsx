import "./Categories.scss";
import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import DB from '../../services/DB.js'
export default function ({resetBurger}) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const response = DB.getAllProducts()
    response.catch((err) => console.log(err))
    response.then((response) => {
      setCategories(response);
    })
  }, []);

  return (
    <div className="blockList">
      {categories.map((element, index) => {
        return (
          <Link to={`/${element.id}`} onClick = {() => resetBurger()} className="menu" key={index}>
            <img src={element.img} alt="" />
            <p>{element.title}</p>
          </Link>
        );
      })}
    </div>
  );
}
