import './App.css';
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Navbar, Footer } from "./component";
import { Protected, Authorize } from './ProtectedRoute/ProtectedRoute';
import { Home, Books, BookDetails, Cart, Contact, Login, SignUp, ShippingDetails, NotMatch, PaymentOption, MyAccount, ResetPassword } from "./pages";
import AdminPanel from './admin/AdminPanel';


export const LoggedIn = React.createContext();

const App = () => {
  const isLogin = useSelector(state => state.user.isLoggedIn);
  const userType = useSelector(state => state.user.userDetails);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (isLogin) {
      setLoggedIn(true);
      (userType.type === "admin") ? <Navigate to={"/admin/dashboard"} /> : <Navigate to={"/"} />
    } else {
      setLoggedIn(false);
    }
  }, [isLogin]);

  return (
    <>
      <div>
        <LoggedIn.Provider value={loggedIn}>
          <Router>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path='/book/:isbn' element={<BookDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/ShippingDetails" element={<ShippingDetails />} />
              <Route path='/reset-password' element={<ResetPassword/>} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/myaccount" element={<MyAccount />} />
              <Route
                path="/login"
                element={
                  <Protected isLoggedIn={isLogin}>
                    <Login />
                  </Protected>
                }
              />
              <Route
                path="/signUp"
                element={
                  <Protected isLoggedIn={isLogin}>
                    <SignUp />
                  </Protected>
                }
              />
              <Route path="/payment-options" element={<PaymentOption />} />
              <Route path="/admin/*" element={
                <Authorize userType={userType.type} isLoggedIn={isLogin}>
                  <AdminPanel />
                </Authorize>
              }>
              </Route>
              <Route path='*' element={<NotMatch />} />
            </Routes>
            <Footer />
          </Router>
        </LoggedIn.Provider>
      </div>
    </>
  )
}

export default App;
