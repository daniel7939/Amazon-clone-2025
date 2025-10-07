import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './Pages/Landing/Landing'
import Auth from './Pages/Auth/Auth'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import Result from './Pages/Result/Result'
import Productdetails from './Pages/ProductDetail/ProductDetail'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';

function Routing() {
  const stripePromise = loadStripe('pk_test_51SE4nEJ7bAPCmKlKHhSfcr3UzeOhCEffsxpKww6w34BuQrZpdkEjI9oHn5cu9H6Lix0v3SYBCTDsJ06WHPGahtYY00ZfJvna37');
return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
  <Route path="/payment" element={
       <ProtectRoute msg={"you need to login to proceed payment"} redirect="/payment"> 
              <Elements stripe={stripePromise}> <Payment /> </Elements> 
 </ProtectRoute>}
        />
        <Route path="/orders" element={
           <ProtectRoute msg={"you need to login to see your orders"} redirect="/orders"> 
          <Orders /> 
          </ProtectRoute>
        } />
        <Route path='/category/:categoryName' element={<Result/>} />
        <Route path="/products/:productId" element={<Productdetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  )
}

export default Routing
