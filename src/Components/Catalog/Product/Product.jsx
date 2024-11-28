import DB from "../../../services/DB";
import {useState} from "react";
import ProductModal from "../../ProductModal/ProductModal";

export default function ({element, setCart, cart}) {
  const [modalOpened, setModalOpened] = useState(false)
  const updateCart = (index, updatedProduct) => {
    const updatedCart = [...cart];
    updatedCart[index] = updatedProduct;
    setCart(updatedCart);
  };

  const updateCartItem = (productInCart) => {
    const cartProductIndex = cart.findIndex(cartProduct => cartProduct.data.id === productInCart.data.id);
    const updatedProduct = {...productInCart, data: {...productInCart.data, qt: productInCart.data.qt + 1}};
    DB.updateProductInCart(updatedProduct.id, updatedProduct);
    updateCart(cartProductIndex, updatedProduct);
  };

  const addCartItem = (product, qt) => {
    const newProduct = {...product, qt: qt};
    Promise.allSettled([  DB.setProductToCart(newProduct)]).then(response => {
      const updatedCart = [...cart, {id: product.id, data: newProduct}];
      console.log(updatedCart)
      setCart(updatedCart);
    });
  };

  const handleAddToCart = (product, qt = 1) => {
    const productInCart = cart.find(cartProduct => cartProduct.data.id === product.id);
    if (productInCart) {
      updateCartItem(productInCart);
    } else {
      addCartItem(product, qt);
    }
  };

  return (
    <>
      <div className="goods">
        <img src={element.photo} alt="photo" onClick={() => setModalOpened((prev) => !prev)}/>
        <p>{element.price}₽</p>
        <p>{element.title}</p>
        <p>{element.weight}</p>
        <button onClick={() => handleAddToCart(element)}>Добавить</button>
      </div>
      {
        modalOpened && (
          <ProductModal
            product={element}
            handleAddToCart = {handleAddToCart}
            setModalOpened={setModalOpened}
          />
        )
      }
    </>
  );
}
