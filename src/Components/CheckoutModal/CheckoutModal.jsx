import '../../assets/modal.scss'
import './CheckoutModal.scss'
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import FormWarning from "../FormWarning/FormWarning.jsx";
import DB from '../../services/DB.js'

export default function ({setModalOpened, setCart, cart}) {
  const [successForm, setSuccessForm] = useState(false)
  const {register, watch, handleSubmit, formState: {errors}, setValue} = useForm()
  useEffect(() => {
    setValue('deliveryType', 'self')
  }, [])
  const handleFormSubmit = (data) => {
    DB.clearCart()
    setCart([])
    setSuccessForm(true)
    setTimeout(() => {
      setSuccessForm(false)
      setModalOpened(false)
    }, 5000)
  }
  return (
    <>
      <div className="modalOverlay" onClick={() => setModalOpened((prev) => !prev)}/>
      <div className="modalInner checkoutModalInner">
        <button className={'btn btn-close'}
                onClick={(e) => setModalOpened((prev) => !prev)}>
          <img src="./close.svg" width={24} height={24} alt="close"/>
        </button>
        <div className="checkoutImage">
          <img src="./ponchik.svg" alt="ponchik"/>
        </div>
        <div className="checkoutForm">
          {
            !successForm ? <form className={'form'} onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="title">Доставка</div>
                <input {...register('name', {required: true})} className={'input'} placeholder={'Ваше имя'}/>
                {errors.name && (<FormWarning text={'Укажите Ваше имя, пожалуйста'}/>)}
                <input {...register('phone', {required: true})} className={'input'} placeholder={'Телефон'}/>
                {errors.phone && (<FormWarning text={'Введите номер телефона, пожалуйста'}/>)}
                <div className="radioControls">
                  <div className="radioControl">
                    <input type="radio" id="selfDelivery" {...register('deliveryType')} value={'self'}/>
                    <label htmlFor="selfDelivery">Самовывоз</label>
                  </div>
                  <div className="radioControl">
                    <input type="radio" id="delivery" {...register('deliveryType')} value={'delivery'}/>
                    <label htmlFor="delivery">Доставка</label>
                  </div>
                </div>
                <div className="delivery">
                  {
                    watch('deliveryType') === 'delivery' && (
                      <div className={'inputsRow'}>
                        <input {...register('address', {required: true})} className={'input'}
                               placeholder={'Улица, дом, квартира'}/>
                        <input {...register('floor')} className={'input'} placeholder={'Этаж'}/>
                        <input {...register('homephone')} className={'input'} placeholder={'Домофон'}/>
                        {
                          errors.address && (
                            <FormWarning text={'Укажите адрес, пожалуйста'} type={'failed'}/>
                          )
                        }
                      </div>
                    )
                  }
                </div>
                <button className={'btnCheckout'}>Оформить</button>
              </form>
              :
              <div className={'success'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                <div className="title">Спасибо за заказ!</div>
                <div className="descr">Ожидайте подтверждения по SMS и Email</div>
              </div>
          } 
        </div>
      </div>
    </>
  )
}