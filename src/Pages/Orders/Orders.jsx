import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../components/LayOut/LayOut";
import { db } from "../../Utility/fairbase";
import { DataContext } from "../../components/Dataprovider/Dataprovider";
import styles from "./Order.module.css";
import CurrencyFormat from "../../components/Currencyformat/CurrencyFormat";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ProductCard from "../../components/Product/ProductCard";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = null;

    // Only fetch if user is logged in
    if (user?.uid) {
      try {
        // Use uid for user-scoped collections and order by createdAt (serverTimestamp)
        const ordersRef = collection(db, "users", user.uid, "orders");
        const q = query(ordersRef, orderBy("createdAt", "desc"));

        unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const fetchedOrders = snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }));
            setOrders(fetchedOrders);
            setLoading(false);
          },
          (err) => {
            // Ignore harmless AbortError which can happen during hot reloads/unmounts
            if (err?.name === "AbortError" || err?.code === "aborted") return;
            console.error("Orders onSnapshot error:", err);
            setLoading(false);
          }
        );
      } catch (err) {
        console.error("Failed to subscribe to orders:", err);
        setLoading(false);
      }
    } else {
      // Reset if user not logged in
      setOrders([]);
      setLoading(false);
    }

    // Cleanup listener when unmounting
    return () => {
      try {
        if (typeof unsubscribe === "function") unsubscribe();
      } catch (e) {
        // ignore errors during cleanup
      }
    };
  }, [user?.uid]);

  return (
    <LayOut>
      <section className={styles.order_section}>
        <div className={styles.order_container}>
          <h2>Your Orders</h2>

          {loading ? (
            <p>Loading your orders...</p>
          ) : orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            orders.map((eachOrder, i) => (
              <div key={i} className={styles.order_card}>
                <hr />
                <span className={styles.order_id}>Order ID: {eachOrder.id}</span>

                {eachOrder?.data?.basket?.map((order, idx) => (
                  <ProductCard flex={true} product={order} key={idx} />
                ))}

                {eachOrder?.data?.amount && (
                  <div className={styles.order_total}>
                    <CurrencyFormat amount={eachOrder.data.amount} />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
