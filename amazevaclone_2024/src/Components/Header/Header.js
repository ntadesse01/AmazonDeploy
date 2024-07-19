import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from "./Header.module.css";
import { FaSearch } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader"
import { DataContext } from '../DataProvider/DataProvider';
import{auth} from "../../Utility/firebase"

 

const Header = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
console.log(totalItem)
  return (
    <div>    
      <section className={classes.fixed} >  
        <section>
          <div className={classes.header__container}>
            {/* {logo} */}
            <div className={classes.header__logo}>             
              <Link to="/">
                <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon Logo" />
              </Link> 
              </div>           
              {/* {Delivery} */}
              <div className={classes.header__delivery}>  
                <span>
                  <SlLocationPin />
                </span>
                <div>
                  <p>Delivered to</p>
                  <span>California</span>
                  
                </div>
              </div>
                        {/* {search} */}
            <div className={classes.search}>              
              <select name='' id=''>
                <option value=''>All</option>
              </select>
              <input type="text" />
              <FaSearch size={38} />
            </div>
            {/* other section */}
            <div className={classes.order__container}>
              <div className={classes.language}>  
                <img src='https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg' alt='USA Flag' />
                <select name="" id="">
                  <option value="">EN</option>
                </select>
              </div>

              <Link to={!user && "auth"}>
                
                <div>
                {user ? (
                  <>
                  <p>Hello, {user.email?.split('@')[0]}</p>
                  <span onClick={()=>auth.signOut()}>Sign Out</span>
                  </>
                  
                ) : (
                  <>
                  <p>Hello, Sign in</p>
                  <span>Account & Lists</span>
                  </>
                  
                )}
              </div>   
           
              </Link>

              <Link to="Order">
                <p>Returns</p>
                <span>& Orders</span> 
              </Link>
              
              <Link to="/cart">
              <BiCart />
            <span>{totalItem}</span>            
          </Link>

            </div>
          </div>
           </section>
           </section> 
      <LowerHeader/>
    </div>
  );
}

export default Header;
