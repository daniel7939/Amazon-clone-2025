import React from 'react'
import LayOut from "../../components/LayOut/LayOut"
import styles from "./Payment.module.css"
import { DataContext } from '../../components/Dataprovider/Dataprovider';
import ProductCard from '../../components/Product/ProductCard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../components/Currencyformat/CurrencyFormat';
import axiosInstance from '../../Api/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/fairbase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';
function Payment() {
  const [{user,basket},dispatch]=React.useContext(DataContext);
  console.log(user)
   const totalItems = basket?.reduce((quantity, item) => {
    return item.quantity + quantity 
  }, 0);
  const total = basket.reduce((amount, item) => {
    return item.price * item.quantity + amount;
  }, 0);

 const [cardError, setCardError] = React.useState(null);
  const [processing, setProcessing] = React.useState(false);
  const [succeeded, setSucceeded] = React.useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handlechange=(event)=>{
    console.log(event);
    setCardError(event.error ? event.error.message : "");
  }
  const handlePayment=async(event)=>{

    event.preventDefault();
    try {
      // Stripe expects amount in cents (integer)
      const amountInCents = Math.round(total * 100);
      const response = await axiosInstance({
        method: "POST",
        url: `/payments/create?total=${amountInCents}`,
      });
      console.log('payment create response:', response.data);
      const clientSecret = response?.data?.clientSecret;
      if (!clientSecret) throw new Error('No clientSecret returned from server');
      setProcessing(true);

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user?.email || 'guest@example.com',
          },
        },
      });

      if (payload.error) {
        console.error('Payment confirmation error:', payload.error);
        setCardError(payload.error.message);
        setProcessing(false);
      } else {
        console.log('Payment succeeded:', payload.paymentIntent);
        setSucceeded(true);
        const paymentIntent = payload.paymentIntent;
        // write order to Firestore using modular API
        try {
          if (user?.uid) {
            const orderRef = doc(db, 'users', user.uid, 'orders', paymentIntent.id);
            await setDoc(orderRef, {
              basket: basket,
              amount: total,
              createdAt: serverTimestamp(),
            });
          } else {
            console.warn('No user available - skipping Firestore write for order', paymentIntent.id);
          }
          dispatch({ type: Type.EMPTY_BASKET });
        } catch (e) {
          console.error('Failed to write order to Firestore:', e);
        }

        setProcessing(false);
      }
      navigate('/orders');
      
    } catch (error) {
      console.error('Payment request failed:', error?.response?.data || error.message || error);
      setCardError(error?.response?.data?.message || error.message || 'Payment service unavailable. Please try again later.');
      setProcessing(false);
    }
  };
  return (
    <LayOut>
      {/* header */}
      <div className={styles.checkout_header}>Checkout ({totalItems}) items</div>
      {/* payment method */}
      <section className={styles.payment_section}>
        {/* address */}
        <div className={styles.payment_address}>
          <h3>Delivery Address</h3>
          <div>
          <div>{user?.email}</div>
          <div>123 React lane</div>
          <div>Los Angeles, CA</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={styles.payment_address}>
          <h3>Review items and delivery</h3>
          <div>
            {
            basket?.map((item, idx) => <ProductCard key={item.id || idx} product={item} flex={true} />)
            }
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={styles.payment_address}>
          <h3>Payment Method</h3>
       <div className={styles.payment_card}>
        <div className={styles.payment_card_form}>
        <form onSubmit={handlePayment}>
          {cardError && <div style={{color:"red", marginBottom:"10px"}}>{cardError}</div>}
          <CardElement onChange={handlechange} />
{/* price */}
     <div className={styles.payment_price}>
      <div>
        <span >Total Order | <strong><CurrencyFormat value={total} /></strong></span>
      </div>
      <button type='submit'>
        {
          processing ?
          (
            <div className={styles.processing}>
              <ClipLoader color='gray' size={12}/>
              <p>Please Wait ...</p>
            </div>
          ) : "Pay Now "}
        
        </button>
     </div>

        </form>
        </div></div>
        </div>
      </section>
      </LayOut>
    
  )
}

export default Payment;