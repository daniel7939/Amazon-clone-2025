import React from "react";
import styles from "./Header.module.css";
import { AiOutlineMenu } from "react-icons/ai";

function LowerHeader() {
  return (
    <nav className={styles.lowerHeader}>
      <ul>
        <li>
          <AiOutlineMenu/>
         <p>All</p>
          </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </nav>
  );
}

export default LowerHeader;
