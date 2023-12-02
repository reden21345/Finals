import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './components/Home';
import CoffeeDetails from './components/coffee/CoffeeDetails';

import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';

import Login from './components/user/login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions';
import store from './store';

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/coffee/:id" element={<CoffeeDetails />} exact />

            <Route path="/cart" element={<Cart />} exact />
            <Route path="/shipping" element={<Shipping />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/me" element={<Profile />} exact/>
            <Route path="/me/update" element={<UpdateProfile />} exact/>
            <Route path="/password/update" element={<UpdatePassword />} exact/>
            <Route path="/password/forgot" element={<ForgotPassword />} exact/>
            <Route path="/password/reset/:token" element={<NewPassword />} exact/>

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
