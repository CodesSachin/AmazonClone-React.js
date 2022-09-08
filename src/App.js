import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { useEffect } from "react";
import { auth } from "./Firebase";
// import { onAuthStateChanged } from "firebase/auth";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe(
  "pk_test_51Lc2CcSHUsU6zRQziK0RrMKc35MXWA2d5l5YVbzf0vb6nKX2rIK0IzJQpsZk90gdPNQDSDUq2objBDIWIKnSfHrD005dsAPBOe"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>>", authUser);

      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="app">
      {/* <Header /> */}
      <Routes>
        <Route
          path="/orders"
          element={
            <>
              <Header />
              <Orders />
            </>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        ></Route>
        <Route
          path="/checkout"
          element={
            <>
              <Header />
              <Checkout />
            </>
          }
        ></Route>
        <Route
          path="/payment"
          element={
            <>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
