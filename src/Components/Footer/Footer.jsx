import "./Footer.scss";
import React from "react";

export default function () {
  return (
    <footer>
      <div className="container">
        <div className="leftBlock">
          <div className="logoFooter">
            <img src="../../../public/logoFooter.png" alt="logo" />
          </div>
        </div>
        <div className="rightBlock">
          <div className="phone">
            <p>Номер для заказа</p>
            <div className="number">
              <img src="../../../public/phone.svg" alt="" />
              <p>+7(930)833-38-11</p>
            </div>
          </div>
          <div className="social">
            <p>Мы в соцсетях</p>
            <div className="icons">
              <img src="../../../public/vk.png" alt="" />
              <img src="../../../public/telegram.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="copyright">
          <p>© YouMeal, 2022</p>
          <span>Design: Anastasia Ilina</span>
        </div>
      </div>
    </footer>
  );
}
