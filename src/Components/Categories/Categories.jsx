import "./Categories.scss";
import { useState } from "react";
import React from "react";
import categoriesData from "../../data/categoties";

export default function () {
  const [categories, setCategories] = useState(categoriesData);
  return (
    <div className="blockList">
      {categories.map((element, index) => {
        return (
          <div className="menu">
            <img src={element.img} alt="" />

            <p>{element.title}</p>
          </div>
        );
      })}
    </div>
  );
}
