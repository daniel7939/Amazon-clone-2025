import Rating from '@mui/material/Rating';
import CurrencyFormat from '../Currencyformat/CurrencyFormat';
import classes from './Product.module.css'
import { Link } from 'react-router-dom';
function ProductCard({Product}) {
    const {title, price, rating, image,id} = Product;
  return (
    <div className={classes.productcard}>
        <Link to={`/products/${id}`}>
            <img src={image} alt="" />
        </Link>
        <div>
            <h3>{title}</h3>
            <div className={classes.ratings}>
                <Rating value={rating.rate} precision={0.5} />
                {/* price */}
                <small>
                    {rating.count}
                </small>
            </div>
            <div>
                {/* price */}
                <CurrencyFormat value={price} />
            </div>
            <button className={classes.button}>
                add to cart
            </button>
        </div>

    </div>
  )
}

export default ProductCard