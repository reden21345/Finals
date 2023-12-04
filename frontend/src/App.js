import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './components/Home';
import CoffeeDetails from './components/coffee/CoffeeDetails';

// Cart
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import OrderSuccess from './components/cart/OrderSuccess'

// Order
import ListOrders from './components/order/ListOrders'
import OrderDetails from './components/order/OrderDetails';

// User
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
import axios from 'axios';

// Admin
import Dashboard from './components/admin/Dashboard';
import CoffeesList from './components/admin/CoffeesList';
import NewCoffee from './components/admin/NewCoffee';
import UpdateCoffee from './components/admin/UpdateCoffee';

// Payments
import Payment from './components/cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


function App() {

  const [stripeApiKey, setStripeApiKey] = useState('')
  
  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');

      setStripeApiKey(data.stripeApiKey);
    }

    getStripeApiKey();

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

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/forgot" element={<ForgotPassword />} exact/>
            <Route path="/password/reset/:token" element={<NewPassword />} exact/>

          </Routes>
          {stripeApiKey &&
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Routes>
                  <Route path="/payment" 
                  element={
                    <ProtectedRoute >
                      <Payment />
                    </ProtectedRoute>
                  } />
                </Routes>
              </Elements>
          }

          {/* User Routes */}
          <Routes>
            <Route path="/me" element={
                <ProtectedRoute >
                  <Profile />
                </ProtectedRoute>
              } exact/>
            <Route path="/me/update" element={
                <ProtectedRoute >
                  <UpdateProfile />
                </ProtectedRoute>
              } exact/>
            <Route path="/orders/me" element={
                <ProtectedRoute >
                  <ListOrders />
                </ProtectedRoute>
              } exact/>
            <Route path="/order/:id" element={
                <ProtectedRoute >
                  <OrderDetails />
                </ProtectedRoute>
              } exact/>
            <Route path="/password/update" element={
                <ProtectedRoute >
                  <UpdatePassword />
                </ProtectedRoute>
              } exact/>
            <Route path="/shipping" element={
                <ProtectedRoute >
                  <Shipping />
                </ProtectedRoute>
              } />
            <Route path="/order/confirm" element={
                <ProtectedRoute >
                  <ConfirmOrder />
                </ProtectedRoute>
              } />
            <Route path="/success" element={
                <ProtectedRoute >
                  <OrderSuccess />
                </ProtectedRoute>
              } />
          </Routes>

        </div>

        {/* Admin Routes */}
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAdmin={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/coffees"
              element={
                <ProtectedRoute isAdmin={true}>
                  <CoffeesList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/coffee"
              element={
                <ProtectedRoute isAdmin={true}>
                  <NewCoffee />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/coffee/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateCoffee />
                </ProtectedRoute>
              }
            />
          </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
