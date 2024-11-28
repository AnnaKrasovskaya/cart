import "./Cart.scss";
import CartItem from "./CartItem/CartItem";
import {useState} from "react";
import CheckoutModal from "../CheckoutModal/CheckoutModal";

export default function ({ cart, setCart }) {
  const [checkoutModal, setCheckoutModal] = useState(false)
  const calculateQt = () => {
    return cart.reduce((accumulator, currentValue) => {
      return (accumulator + currentValue.data.qt);
    }, 0);
  };
  const calculateSumm = () => {
    return cart.reduce((accumulator, currentValue) => {
      return (accumulator + currentValue.data.price * currentValue.data.qt);
    }, 0);
  };
  const handleUpdateCart = (index, cartItem) => {
    const updatedCart = [...cart]
    updatedCart[index] = cartItem
    setCart(updatedCart)
  }
  const handleDeleteCartItem = (index) => {
    const updatedCart = [...cart]
    updatedCart.splice(index, 1)
    setCart(updatedCart)
  }
  const [sidebarOpened, setSidebarOpened] = useState(false)

  return (
    <>
      <div className="mobileCart" onClick = {() => setSidebarOpened((prev) => !prev)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart"
             viewBox="0 0 16 16">
          <path
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
        </svg>
        <span className="counter">
          {calculateQt()}
        </span>
      </div>
      <div className={`sidebar ${sidebarOpened ? 'active' : ''}`}>
        <div className="cart">
          <h2>Корзина</h2>
          <p>{calculateQt()}</p>
        </div>
         <div className="productsInCart">
        {cart.length !== 0
          ? cart.map((element, index) => (
              <CartItem
                element={element}
                handleUpdateCart={handleUpdateCart}
                handleDeleteItem={handleDeleteCartItem}
                currentIndex={index}
                key={index}
              />
            ))
          : "Тут пока пусто :("}
         </div>
        {cart.length !== 0 && (
          <>
            <div className="sum">
              <p>Итого</p>
              <p>{calculateSumm()}₽</p>
            </div>
            <div className="checkOut">
              <button onClick={() => setCheckoutModal((prev) => !prev)}>Оформить заказ</button>
            </div>
            {
              (calculateQt() >= 3 || calculateSumm() >= 1000) && (
                <div className="delivery">
                  <img src="./delivery.svg" alt="delivery" />
                  <p>Бесплатная доставка</p>
                </div>
              )
            }
          </>
        )}
      </div>
      {
       checkoutModal && (
          <CheckoutModal setModalOpened={setCheckoutModal}
                         cart={cart}
                         setCart = {setCart}/>
        )
      }
    </>
  );
}
