import "./Header.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import Categories from "../Categories/Categories";

export default function ( ) {
  const [burger, setBurger] = useState(false);
  const resetBurger = () => {
   setBurger((prev) => !prev)
  };
  return (
    <header>
      <div className="burger" onClick={() => setBurger(!burger)}>
        <img src="/menuicon.svg" alt="icon"/>
      </div>
      {burger && (
        <aside className="aside__menu">
          <button className="close" onClick={() => setBurger(false)}>
            <img src="/close.svg" alt="close"/>
          </button>
          <div className="logo">
            <img src={"logo.png"} width={140} height={70} alt={'Logo'} />
          </div>
          <Categories resetBurger = {resetBurger} />
        </aside>
      )}
      <div className="logo">
        <img src="./logo.png" alt="logo" />
      </div>
      <div className="container">
        <div className="content">
          <div className="left">
            <img src="/burgerHeader.png" alt="" />
          </div>
          <div className="right">
            <h2>
              Только самые <span>сочные бургеры!</span>
            </h2>
            <p>
              Бесплатная доставка от <span>1000₽</span>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
