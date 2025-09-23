import {Carousel} from "react-responsive-carousel"
import {img} from "../img/data"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import styles from "./carousel.module.css";
function CarouselEffect() {
  return (
    <div>
        <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        > 
         {
            img.map((imageItemLink, idx)=>{
                return <img src={imageItemLink} key={idx}/>
            })
        }
        </Carousel>
        <div className="hero_img"></div>
    </div>
  )
}

export default CarouselEffect