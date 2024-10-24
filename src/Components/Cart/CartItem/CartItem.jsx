import DB from "../../../services/DB";
export default function ({ element, setCartStatus }) {
  const deleteElement = (id) => {
    DB.deleteProductFromCart(id);
  };
  const handleQt = (type) => {
    if (type === "minus" && element.data.qt !== 1) {
      element.data.qt -= 1;
      DB.updateProductInCart(element.id, element);
    } else if (type === "minus" && element.data.qt === 1) {
      deleteElement(element.id);
    } else {
      element.data.qt += 1;
      DB.updateProductInCart(element.id, element);
    }
    setCartStatus((prev) => !prev);
  };

  const { title, photo, weight, qt, price } = element.data;

  return (
    <div className="product">
      <div className="photo">
        <img src={photo} alt="photo" />
      </div>
      <div className="descr">
        <p>{title}</p>
        <p>{weight}</p>
        <p>{price}₽</p>
      </div>
      <div className="qt">
        <button onClick={() => handleQt("minus")}>-</button>
        <p>{qt}</p>
        <button onClick={() => handleQt("plus")}>+</button>
      </div>
    </div>
  );
}
