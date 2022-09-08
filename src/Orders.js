import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./Firebase";
import Order from "./Order";
import "./Orders.css";
import { useStateValue } from "./StateProvider.js";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      console.log("if part");
      const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        console.log(querySnapshot.docs);
        setOrders(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      };
      fetchData();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map((order) => {
          <Order order={order} />;
        })}
      </div>
    </div>
  );
}

export default Orders;
