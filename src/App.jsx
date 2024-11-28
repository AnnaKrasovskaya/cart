import "./App.css";
import './Form.scss'
import DB from "./services/DB.js";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Header from "./Components/Header/Header";
import Catalog from "./Components/Catalog/Catalog";
import Footer from "./Components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    Promise.allSettled( [ DB.getCartProducts()]).then((response) => {
        setCart(response[0].value)
    })
  }, []);
  return (
    <>
      <Header/>
      <Categories />
      <main>
        <Cart cart={cart} setCart={setCart} />
        <Routes>
          <Route
            path="/"
            element={<Catalog
              cart={cart}
              setCart = {setCart}
            />}
          />
          <Route
            path="/:slug"
            element={
              <Catalog
                cart={cart}
                setCart = {setCart}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
export default App;
