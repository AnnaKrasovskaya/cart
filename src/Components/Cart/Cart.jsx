import "./Cart.scss";
import { useState } from "react";
export default function () {
  const [cart, setCart] = useState([
    {
      title: "Супер сырный",
      weight: "512г",
      price: 550,
      photo: "burger.svg",
      qt: 1,
    },
    {
      title: "Картошка фри",
      weight: "180г",
      price: 245,
      photo: "potato.svg",
      qt: 2,
    },
    {
      title: "Жгучий хот-дог",
      weight: "245г",
      price: 239,
      photo: "hotdog.svg",
      qt: 1,
    },
  ]);

  const handleQtPlus = (index) => {
    const currentState = [...cart];
    currentState[index].qt += 1;
    setCart(currentState);
  };
  const deleteElement = (index) => {
    const currentState = [...cart];
    currentState.splice(index, 1);
    setCart(currentState);
  };
  const handleQtMinus = (index) => {
    const currentState = [...cart];
    if (currentState[index].qt >= 2) {
      currentState[index].qt -= 1;
      setCart(currentState);
    } else {
      deleteElement(index);
    }
  };
  const calculateQt = () => {
    const qt = cart.reduce((accumulator, currentValue) => {
      return (accumulator += currentValue.qt);
    }, 0);
    return qt;
  };

  const calculateSumm = () => {
    const summ = cart.reduce((accumulator, currentValue) => {
      return (accumulator += currentValue.price * currentValue.qt);
    }, 0);
    return summ;
  };

  return (
    <>
      <div className="sidebar">
        <div className="cart">
          <h2>Корзина</h2>
          <p>{calculateQt()}</p>
        </div>

        {cart.length !== 0
          ? cart.map((element, index) => {
              return (
                <div className="product" key={index}>
                  <div className="photo">
                    <img src={element.photo} alt="photo" />
                  </div>
                  <div className="descr">
                    <p>{element.title}</p>
                    <p>{element.weight}</p>
                    <p>{element.price}₽</p>
                  </div>
                  <div className="qt">
                    <button onClick={() => handleQtMinus(index)}>-</button>
                    <p>{element.qt}</p>
                    <button onClick={() => handleQtPlus(index)}>+</button>
                  </div>
                </div>
              );
            })
          : "Тут пока пусто :("}
        {cart.length !== 0 && (
          <>
            <div className="sum">
              <p>Итого</p>
              <p>{calculateSumm()}₽</p>
            </div>
            <div className="checkOut">
              <button>Оформить заказ</button>
            </div>
            <div className="delivery">
              <img src="./delivery.svg" alt="" />
              <p>Бесплатная доставка</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
