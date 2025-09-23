import React from 'react'
import styles from './Catagory.module.css'
function CatagoryCard({data}) {
  return (
    <div className={styles.catCard}>
      <a href="">
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imglink} alt="" />
        <p>shop now</p>
      </a>

    </div>
  )

}
export default CatagoryCard