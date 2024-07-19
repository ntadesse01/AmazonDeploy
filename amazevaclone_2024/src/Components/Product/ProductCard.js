import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../../Components/CurencyFormat/CurrencyFormat';  
import classes from './Product.module.css';
import { Link } from 'react-router-dom';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';


function ProductCard({ product, flex, renderDesc , renderAdd}) {
  const { id, image, title, rating, price, description } = product;
const  [state, dispatch ] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id,
        image,
        title,
        rating,
        price,
        description
      }
    });
  };
    console.log(product);
  
    return (
        <div className={`${classes.card__container} ${flex ? classes.product__flexed : ''}`}>
        <Link to={`/products/${id}`}>  
          <img src={image} alt={`Image of ${title}`} className={classes.img_container} />
        </Link><div>
  <h3>{title}</h3>
  {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
  <div className={classes.rating}>
    <Rating value={rating?.rate} precision={0.1} />
    <small>({rating?.count})</small>
  </div>
  <div>
    <CurrencyFormat amount={price} />
  </div>
{  renderAdd && ( <button className={classes.button} onClick={addToCart}>
    Add to cart
  </button>)}
</div>
      </div>
    );
  }
  
  export default ProductCard;