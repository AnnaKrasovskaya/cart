import DB from "../../../services/DB";
export default function ({ element, setCartStatus }) {
  const handleAddToCart = (element) => {
    element.qt = 1;
    DB.setProductToCart(element);
    setCartStatus(true);
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
