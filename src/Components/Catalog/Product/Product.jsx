import DB from "../../../services/DB";

export default function ({ element, setCartStatus, cart }) {
  const handleAddToCart = (element) => {
    const isProductInCart = cart.find((cartProduct) => {
      return cartProduct.data.id === element.id;
    });
    if (isProductInCart) {
      isProductInCart.data.qt += 1;
      DB.updateProductInCart(isProductInCart.id, isProductInCart);
    } else {
      element.qt = 1;
      DB.setProductToCart(element);
    }
    setCartStatus((prev) => !prev);
  };
  return (
    <div className="goods">
      <img src={element.photo} alt="" />
      <p>{element.price}₽</p>
      <p>{element.title}</p>
      <p>{element.weight}</p>
      <button onClick={() => handleAddToCart(element)}>Добавить</button>
    </div>
  );
}
