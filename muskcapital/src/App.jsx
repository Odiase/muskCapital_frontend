import { useState } from 'react'

import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Index from './pages/index'
import TeslaPage from './pages/tesla';
import SpaceXPage from './pages/spacex';
import Neuralink from './pages/neuralinks';
import Login from './pages/login';
import Portfolio from './pages/portfolio';
import Order from './pages/order';
import Register from './pages/register';
import CryptoPayment from './pages/payment';
import Details from './pages/details';

// import Details from './pages/details';




function App() {
  

  return (
    <Router>
      <Routes>
        
          <Route index element={<Index />} />
          <Route path='tesla' element={<TeslaPage />} />
          <Route path='details/:stockname/:tier' element={<Details />} />
          <Route path='spacex' element={<SpaceXPage />} />
          <Route path='login' element={<Login />} />
          <Route path='neuralink' element={<Neuralink />} />
          <Route path='order' element={<Order />} />
          <Route path='portfolio' element={<Portfolio />} />
          <Route path='signup' element={<Register />} />
          <Route path='payment' element={<CryptoPayment />} />
     
     


      </Routes>
    </Router>
  )
}

export default App
