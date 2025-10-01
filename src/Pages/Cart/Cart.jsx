import React,{use, useContext} from 'react'
import LayOut from '../../components/LayOut/LayOut'
import { DataContext } from '../../components/Dataprovider/Dataprovider'
import ProductCard from '../../components/Product/ProductCard'
import { Link } from 'react-router-dom'
import CurrencyFormat from '../../components/Currencyformat/CurrencyFormat'
import styles from './Cart.module.css'
import { Type } from '../../Utility/action.type'
import {IoIosArrowUp} from 'react-icons/io'
import {IoIosArrowDown} from 'react-icons/io'
function Cart() {
  const [{basket, user},dispatch]=useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.quantity + amount;
  }, 0);
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      payload: id,
    });
  };
  return (
    <LayOut>
      <section className={styles.cart_section}>
  <div className={styles.cart_left}>
          <h1>Hello{user ? `, ${user}` : ''}</h1>
          <h3>Your Shopping Basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            basket?.map((item, p) => {
              return <section className={styles.cart_item}>
              <ProductCard
                key={item.id || p}
                Product={item}
                renderDesc={true}
                renderAdd={false}
                flex={true}
              />
              <div className={styles.quantity_control}>
                <button className={styles.btn} onClick={()=>increment(item)}>
                  <IoIosArrowUp size={30}/>
                </button>
                <span>{item.quantity}</span>
                <button className={styles.btn} onClick={()=>decrement(item.id)}>
                  <IoIosArrowDown size={30} />
                  </button>
              </div>
              </section>
})
          )}
        </div>
        
          {basket?.length > 0 && (
            <div className={styles.subtotal} >
              <div >
                <h3>Subtotal ({basket?.length} items):</h3>
                <CurrencyFormat value={total} />
              </div>
              <span >
                <input type='checkbox' />
                <small >This order contains a gift</small>
              </span>
              <Link  to='/payment'>Continue to Checkout</Link>
            </div>
          )}
       
      </section>
    </LayOut>
  )
}

export default Cart