import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Auth from "./pages/Auth/Auth"
import Payment from './pages/Payment/Payment'
import Orders from './pages/Orders/Orders'
import Cart from './pages/Cart/Cart'
import Results from './pages/Results/Results'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51ON3HdENRNGyYgbwdr1ortrWQtwfobgL5JZa0FHcOAm42UG2lJUSevQTsQH6fELJ8LUMHmDJcZttXYk3kXL9FVhZ00RDuppe6y');
function Routing() {
  return (
    <Router>     
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route 
            path="/payment" 
            element={  
              <Elements stripe={stripePromise}>
                <Payment/>
              </Elements>
            } 
          />
          <Route path="/order" element={<Orders />} />
          <Route path="/category/:categoryName" element={<Results/>} />
          <Route path="/products/:productId" element={<ProductDetail/>} />
          <Route path="/cart" element={<Cart />} />
        </Routes>    
    </Router>
  )
}

export default Routing;