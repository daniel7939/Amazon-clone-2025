import React from "react";
import styles from "./Header.module.css";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>
      <Link to="/">  <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Amazon Logo"
        /></Link>
        <span>
            <SlLocationPin/>
        </span>
        <div className={styles.deliver}>
            <p>Delivered to</p>
            <span>Ethiopia</span>
        </div>
      </div>
      <div>
        
      </div>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <select name="" id="">
          <option value="">All</option>
        </select>
        <input type="text" placeholder="Search Amazon" />
        <button>
          <FaSearch />
        </button>
      </div>

      {/* Right Side */}
      <div className={styles.rightSection}>
        <a href="">
          <img src="data:image/png;base64,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" alt="" />
        
        <select name="" id="">
          <option value="">EN</option>
        </select>
        </a>
        <div className={styles.account}>
          <span>Hello, Sign in</span>
          <strong>Account & Lists</strong>
        </div>
        <Link to="/orders" className={styles.orders}>
          
          <span>Returns</span>
          <strong>& Orders</strong>
        
        </Link>
        <Link to="/cart" className={styles.cart}>
          <FaShoppingCart size={24} />
          <span className={styles.cartCount}>0</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
