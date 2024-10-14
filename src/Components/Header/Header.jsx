import { useState } from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";

export default function ({ authed }) {
  const [burger, setBurger] = useState(false);
  const resetBurger = () => {
    setBurger(false);
  };
  return (
    <header>
      <div className="burger" onClick={() => setBurger(!burger)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
          />
        </svg>
      </div>
      {burger && (
        <aside className="aside__menu">
          <button className="close" onClick={() => setBurger(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
          <div className="logo">
            <img src={"logo.png"} width={140} height={70} />
            <NavLink to="/" onClick={resetBurger}>
              Главная
            </NavLink>
          </div>

          <nav>
            <div className="wrap">
              {!authed && (
                <NavLink onClick={resetBurger} to="/auth" className={"login"}>
                  Авторизация
                </NavLink>
              )}
              {authed && (
                <span className="user">Здравствуйте, вы залогинены</span>
              )}

              <NavLink onClick={resetBurger} to="/register">
                Регистрация
              </NavLink>
            </div>
          </nav>
        </aside>
      )}
      <div className="logo">
        <img src="./logo.png" alt="" />
      </div>
      <div className="container">
        <div className="content">
          <div className="left">
            <img src="../../../public/burgerHeader.png" alt="" />
          </div>
          <div className="right">
            <h2>
              Только самые <span>сочные бургеры!</span>
            </h2>
            <p>
              Бесплатная доставка от <span>599₽</span>
            </p>
            <button>Добавить</button>
          </div>
        </div>
      </div>
    </header>
  );
}
