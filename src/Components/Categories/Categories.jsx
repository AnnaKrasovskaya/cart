import "./Categories.scss";
import { useEffect, useState } from "react";
import React from "react";

export default function () {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setCategories(result);
      });
  }, []);

  return (
    <div className="blockList">
      {categories.map((element, index) => {
        return (
          <div className="menu" key={index}>
            <img src={element.img} alt="" />

            <p>{element.title}</p>
          </div>
        );
      })}
    </div>
  );
}
