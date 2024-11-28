import '../../assets/modal.scss'
import './ProductModal.scss'
import {useState} from "react";

export default function ({product, setModalOpened, handleAddToCart}) {
  const [counter, setCounter] = useState(1)
  const [cartText, setCartText] = useState('Добавить')
  const handleQtMinus = () => {
    if(counter !== 1) {
      setCounter((prev) => prev - 1)
    }
  }
  const handleQtPlus = () => {
    setCounter((prev) => prev + 1)
  }

  return (
    <>
      <div className="modalOverlay" onClick={() => setModalOpened((prev) => !prev)}/>
      <div className="modalInner productModal">
        <button className={'btn btn-close'}
                onClick={(e) => setModalOpened((prev) => !prev)}>
          <img src="./close.svg" width={24} height={24} alt="close"/>
        </button>
        <div className="title">{product.title}</div>
        <div className="productFlex">
          <div className="thumb">
            <img src={product.photo} width={276} height={220} alt="photo"/>
          </div>
          <div className="caption">
            <p>{product.description}</p>
            <p>Состав</p>
            <p>{product.ingredients}</p>
          </div>
        </div>
        <div className="cartFlex">
          <div className="addToCart">
            <button className={'btn btn-add-to-cart'} onClick={() => {
              handleAddToCart(product, counter)
              setCartText('✓ Добавлено!')
            }}>{cartText}</button>
            <div className="qt">
              <button onClick={handleQtMinus}>-</button>
              <p>{counter}</p>
              <button onClick={handleQtPlus}>+</button>
            </div>
          </div>
          <div className="price">{product.price * counter}₽</div>
        </div>
      </div>
    </>
  )
}