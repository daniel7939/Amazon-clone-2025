import Rating from '@mui/material/Rating';
import CurrencyFormat from '../Currencyformat/CurrencyFormat';
import classes from './Product.module.css'
function ProductCard({Product}) {
    const {title, price, rating, image,id} = Product;
  return (
    <div className={classes.productcard}>
        <a href="">
            <img src={image} alt="" />
        </a>
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