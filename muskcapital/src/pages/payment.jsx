import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './payment.css'

import MobileNavbar from '../components/mobile-nav';
import DesktopNav from '../components/desktop';
const CryptoPayment = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [isBlurred, setIsBlurred] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [error, setError] = useState('');
  const [amount, setAmount] = useState(null);
  const [stockData, setStockData] = useState(null);

  const location = useLocation()
  const navigate = useNavigate();
useEffect(() => {
  const token = sessionStorage.getItem('access');
  if (!token) {
    navigate('/login');
  }
}, [navigate]);
useEffect(() => {
  const incomingData = location.state?.stockData;

  if (incomingData?.amount) {
    const parsed = parseFloat(incomingData.amount);
    setAmount(parsed);
    setStockData(incomingData); // ✅ Save the full stockData for later use
    console.log(incomingData);
  } else {
    setAmount(300);
    setStockData(null)
    console.log("Missing amount in stockData:", incomingData);
  }
}, [location.state]);


  const addresses = {
    btc: "bc1qkevrmwy0n6m9fajmkqhxav2kr8sga7c6p5jnw8",
    eth: "0x5128f9f7bdfa0863f4c6656c354eda72fd5aa79e",
    xrp: "raLckDVrZHNsKDan7bKxUrXgaL9o4pr8np",
    doge: "DCVkm5H8f7qpPf6eUqeXBdo7pkrBuZacRF"
  };

  const handleCryptoChange = (e) => {
    const selected = e.target.value;
    setSelectedCrypto(selected);
    setIsBlurred(true);
    setCopySuccess('');
    setError('');
  };

  const copyAddress = async () => {
    if (!selectedCrypto) return;
    
    try {
      await navigator.clipboard.writeText(addresses[selectedCrypto]);
      setIsBlurred(false);
      setCopySuccess('Address copied to clipboard!');
      setTimeout(() => setCopySuccess(''), 3000);
    } catch (err) {
      setError('Failed to copy address');
      console.error('Failed to copy:', err);
    }
  };
console.log(amount);

  const confirmPayment = async (e) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);
    const token = sessionStorage.getItem('access')
    
console.log(token);
if (stockData != null){
    try {
      const response = await fetch('https://muskcapital.onrender.com/payments/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Payment failed');
      }

      const data = await response.json();
      console.log('Payment successful:', data);
      
      
      alert('Payment Confirmed!');
      const purchase_date = data.requested_at?.split('T')[0]; // e.g., "2025-07-18"
console.log({
        stock_name: stockData.stock_name,
        stock_symbol: stockData.stock_symbol,
        quantity: 1,
        purchase_price: stockData.amount,
        current_price: stockData.price, // optional
        purchase_date
      });
      const stockPostResponse = await fetch('https://muskcapital.onrender.com/stocks/create-or-update/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        stock_name: stockData.stock_name,
        stock_symbol: stockData.stock_symbol,
        quantity: stockData.quantity || 1,
        purchase_price: stockData.price.toString(), // optional
        purchase_date
      }),
    });

    if (!stockPostResponse.ok) {
      const stockError = await stockPostResponse.json();
      throw new Error(stockError.message || 'Stock post failed');
    }

    const stockResult = await stockPostResponse.json();
    console.log('Stock saved:', stockResult);
    navigate('/portfolio')
    alert('Payment Confirmed & Stock Saved!');
    } catch (err) {
        if (err) {
            console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
        }
      
    } finally {
      setIsProcessing(false);
    }}else{navigate('/')}
  };

  return (
    
    <div className="container">
<style>{styles}</style>        <MobileNavbar style={{height:'60px',marginTop:'-90px'}}/>
       <DesktopNav style={{height:'px',paddingTop:'0px'}}/>

      <h1>Crypto Payment</h1>
      <p className="payment-amount">Amount to Pay: <strong>${amount}</strong></p>

      <div className="wallet-selection">
        <label htmlFor="cryptoSelect">Choose a cryptocurrency:</label>
        <select 
          id="cryptoSelect" 
          value={selectedCrypto}
          onChange={handleCryptoChange}
          disabled={isProcessing}
        >
          <option value="" disabled>Select an option</option>
          <option value="btc">Bitcoin (BTC)</option>
          <option value="eth">Ethereum (ETH)</option>
          <option value="xrp">XRP</option>
          <option value="doge">Dogecoin (DOGE)</option>
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}
      {copySuccess && <div className="success-message">{copySuccess}</div>}

      <div className="wallet-display">
        <p className="wallet-label">Wallet Address:</p>
        <div id="walletAddress" className={isBlurred ? 'blurred' : ''}>
          {selectedCrypto ? addresses[selectedCrypto] : '•••••••••••••••••••••••••••••••'}
        </div>
        <button 
          onClick={copyAddress}
          disabled={!selectedCrypto || isProcessing}
        >
          Copy Address
        </button>
        
        {!isBlurred && (
          <form onSubmit={confirmPayment}>
            <input type="hidden" name="amount" value={amount} />
            <button 
              type="submit"
              disabled={isProcessing}
              className={isProcessing ? 'processing' : ''}
            >
              {isProcessing ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : 'I Have Made Payment'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CryptoPayment;
