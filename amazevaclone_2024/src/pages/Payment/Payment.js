import React, { useContext, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";  
import CurrencyFormat from '../../Components/CurencyFormat/CurrencyFormat';
import { axiosInstance } from "../../Api/axios"
import { ClipLoader } from 'react-spinners';
import {db} from '../../Utility/firebase'
import { useNavigate } from "react-router-dom"
import { Type } from '../../Utility/action.type';
 
 
function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket?.reduce((amount, item) => item.price * item.amount + amount, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => { 
    e.preventDefault();
    
    try {
      setProcessing(true);
      // 1. Backend contact to get the client secret 
      const response = await axiosInstance({
        method: "POST", 
        url: `/payment/create?total=${total * 100}`,
      });

      const clientSecret = response.data?.clientSecret;

      // 2. Client-side (React side) confirmation
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      
      if (error) {
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      // 3. After the confirmation --> order Firestore database save, clear the basket 
      await db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      // empty basket after order complete
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new Order" } });
    } catch (error) {
      console.error(error);
      setProcessing(false);
      setCardError(error.message);
    }
  };
  
  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment__header}>CheckOut ({totalItem}) items</div>
      {/* payment */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>California </div>
          </div>
        </div>
        <hr />
        {/* products */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {cardError && <small style={{color:"red"}}>{cardError}</small>}
                <CardElement onChange={handleChange} />
                <div className={classes.payment__price}>
                  <div>
                    <span style={{display: "flex", gap:"10px"}}>
                      <p>Total order  | </p>  <CurrencyFormat amount={total}/>
                    </span>
                  </div>
                  <button type='submit'>
                    { 
                      processing ? (
                        <div className={classes.loading}>
                          <ClipLoader color="gray" size={12}/>
                          <p>Please Wait ... </p>
                        </div>
                      ) : "Pay Now"
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;