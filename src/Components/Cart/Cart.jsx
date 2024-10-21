import "./Cart.scss";
import CartItem from "./CartItem/CartItem";

export default function ({ cart, setCartStatus }) {
  const calculateQt = () => {
    const qt = cart.reduce((accumulator, currentValue) => {
      return (accumulator += currentValue.data.qt);
    }, 0);
    return qt;
  };

  const calculateSumm = () => {
    const summ = cart.reduce((accumulator, currentValue) => {
      return (accumulator += currentValue.data.price * currentValue.data.qt);
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
          ? cart.map((element, index) => (
              <CartItem
                element={element}
                setCartStatus={setCartStatus}
                key={index}
              />
            ))
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
