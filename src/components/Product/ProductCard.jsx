import React from 'react'
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../Currencyformat/CurrencyFormat';
import classes from './Product.module.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../../components/Dataprovider/Dataprovider';

function ProductCard({Product, product, flex, renderDesc, renderAdd}) {
    // support both `Product` and `product` prop names and guard for undefined
    const prod = Product || product || {};
    const { title, price, rating = { rate: 0, count: 0 }, image, id } = prod;
    const [state, dispatch] = useContext(DataContext);
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
                        <Rating value={rating?.rate || 0} precision={0.5} />
                        <small>
                            {rating?.count || 0}
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