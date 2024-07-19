import React, { useContext } from 'react';
import classes from './Cart.module.css';
import Layout from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from "../../Components/Product/ProductCard";
import { Link } from 'react-router-dom';
import CurrencyFormat from '../../Components/CurencyFormat/CurrencyFormat';
import { Type } from '../../Utility/action.type';
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineArrowDropUp } from "react-icons/md";

function Cart() {
  const [{ basket, user}, dispatch] = useContext(DataContext);
  const total = basket?.reduce((amount, item) => {
    return item.price *item.amount + amount;
  }, 0);
  const increment  = (item)=> {dispatch({
    type: Type.ADD_TO_BASKET,
    item
    })}
const decrement = (id)=> {dispatch({
  type: Type.REMOVE_FROM_BASKET,
  id
})}


  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {
            basket?.length === 0 ? (
              <p>Oops! No items in your cart</p>
            ) : (
              basket?.map((item, index) => {
                return <section 
                key={index}
                className={classes.cart_product}>  

                <ProductCard
                  key={index}
                  product={item}
                  renderAdd={false}
                  renderDesc={true}
                  flex={true}
                />
                <div className={classes.btn_container}>
                  <button className={classes.btn} onClick={()=>increment(item)}>

                  <MdOutlineArrowDropUp size={25}/>
                  </button>
                  <span>{item.amount}</span>
                  <button className={classes.btn} onClick={()=>decrement(item.id)}>

                  <IoMdArrowDropdown size={25}/>
                  </button>
                </div>
                </section>
              })
            )
          }
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payment">Continue to checkout </Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;