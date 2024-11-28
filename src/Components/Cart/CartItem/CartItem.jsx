import DB from "../../../services/DB";

export default function ({element, handleUpdateCart, currentIndex, handleDeleteItem}) {
  const handleQtPlus = () => {
    const updatedElement = {...element}
    updatedElement.data.qt += 1;
    DB.updateProductInCart(element.id, element);
    handleUpdateCart(currentIndex, updatedElement)
  }
  const handleQtMinus = () => {
    const updatedElement = {...element}
    console.log(updatedElement)
    if (updatedElement.data.qt !== 1) {
      updatedElement.data.qt -= 1;
      DB.updateProductInCart(updatedElement.id, updatedElement);
    } else if (updatedElement.data.qt === 1) {
      DB.deleteProductFromCart(updatedElement.id).then(r => handleDeleteItem(currentIndex) );
    }
    handleUpdateCart(currentIndex, updatedElement)
  }

  const {title, photo, weight, qt, price} = element.data;

  return (
    <div className="product">
      <div className="photo">
        <img src={photo} alt="photo"/>
      </div>
      <div className="descr">
        <p>{title}</p>
        <p>{weight}</p>
        <p>{price}₽</p>
      </div>
      <div className="qt">
        <button onClick={handleQtMinus}>-</button>
        <p>{qt}</p>
        <button onClick={handleQtPlus}>+</button>
      </div>
    </div>
  );
}
