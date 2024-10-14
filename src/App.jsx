import "./App.css";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Header from "./Components/Header/Header";
import Catalog from "./Components/Catalog/Catalog";
import Footer from "./Components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Auth from "./Components/Auth/Auth.jsx";
import { useState } from "react";
import { set } from "react-hook-form";
import Register from "./Components/Register/Register.jsx";
function App() {
  const [authed, setAuth] = useState(false);
  const [users, setUsers] = useState([]);
  console.log(authed);
  return (
    <>
      <Header authed={authed} />
      {authed && <Categories />}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              authed ? (
                <>
                  <Cart />
                  <Catalog />
                </>
              ) : (
                <Auth setAuthed={setAuth} users={users} />
              )
            }
          />
          <Route
            path="/auth"
            element={<Auth setAuthed={setAuth} users={users} />}
          />
          <Route
            path="/register"
            element={<Register setUsers={setUsers} users={users} />}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
