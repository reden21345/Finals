import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './components/Home';
import CoffeeDetails from './components/coffee/CoffeeDetails';

import Login from './components/user/login';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
          <div className="container container-fluid">
            <Routes>
              <Route path = "/" element={<Home/>} exact /> 
              <Route path = "/search/:keyword" element={<Home/>}/> 
              <Route path = "/coffee/:id" element={<CoffeeDetails/>} exact /> 

              <Route path = "/login" element={<Login/>} exact /> 
            </Routes> 
          </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;