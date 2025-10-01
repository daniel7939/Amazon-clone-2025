import React from 'react'
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../Currencyformat/CurrencyFormat';
import classes from './Product.module.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../../components/Dataprovider/Dataprovider';

function ProductCard({Product,flex,renderDesc,renderAdd}) {
        const {title, price, rating, image,id} = Product;
        const [state,dispatch]=useContext(DataContext); 
        console.log(state);
        const addtoCart = () => {
            dispatch({
                type: 'ADD_TO_BASKET',
                item: {title, price, rating, image,id}
            });
        }

        return (
            <div className={`${classes.productcard} ${flex ? classes.product_flexed : ''}`}>
                <Link to={`/products/${id}`}>
                    <img src={image} alt="" />
                </Link>
                <div>
                    <h3>{title}</h3>
                    {/* {renderDesc && <p style={{maxWidth:"750px"}}>{Product.description}</p>} */}

                    <div className={classes.ratings}>
                        <Rating value={rating.rate} precision={0.5} />
                        <small>
                            {rating.count}
                        </small>
                    </div>
                    <div>
                        <CurrencyFormat value={price} />
                    </div>
                {    renderAdd &&
                    <button className={classes.button} onClick={addtoCart}>
                        add to cart
                    </button>
}
                </div>
            </div>
        );
}

export default ProductCard