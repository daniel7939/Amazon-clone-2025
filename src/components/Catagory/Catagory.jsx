import React from 'react'
import {categoryimage} from './catagoryFullinfo'
import CatagoryCard from './CatagoryCard'
import styles from './Catagory.module.css'
function Catagory() {
  return (
      
<section className={styles.catagorySection}>
  {
    categoryimage.map((infos)=>(
        <CatagoryCard data={infos}/>
      
    ))
  }
</section>
    
  )
}

export default Catagory