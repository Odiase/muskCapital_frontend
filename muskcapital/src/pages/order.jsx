import React, { useState, useEffect } from 'react';
import './order.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Order = ({ modal, setModal, stockData }) => {
  const [inputValue, setInputValue] = useState('');
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  
const maxRange = stockData?.range || Infinity;
 // fallback if range is undefined

  useEffect(() => {
    const price = stockData?.price || 0;

    if (stockData?.shares !== undefined) {
      setAmount(Math.ceil(price * stockData.shares));
    }
  }, [stockData]);

  const handleInputChange = (e) => {
    const raw = e.target.value;
    const cleaned = raw.replace(/^0+(?=\d)/, '');
    const numeric = parseFloat(cleaned) || 0;

    if (numeric > maxRange) {
      return; // stop input if above allowed range
    }

    setInputValue(cleaned);
    setAmount(numeric);
  };

  const payment = () => {
    navigate('/payment', {
      state: {
        stockData: {
          ...stockData,
          amount: amount,
        },
        userPayment: amount,
      },
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <button onClick={() => setModal(false)} className="close-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="modal-title">Buy {stockData?.tier || stockData?.name || 'Stock'}</h2>
          <div className="header-spacer"></div>
        </div>

        {/* Form Content */}
        <div className="modal-content">
          {stockData?.shares === undefined ? (
            <div className="form-group">
              <label className="form-label">Investment Amount ($)</label>
              <input
                type="number"
                className="form-input"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="0"
                max={maxRange}
              />
              {parseFloat(inputValue) > maxRange && (
                <small style={{ color: 'red' }}>Max allowed: ${maxRange}</small>
              )}
            </div>
          ) : (
            <div className="form-group">
              <label className="form-label">Shares (fixed)</label>
              <input
                type="number"
                className="form-input"
                value={stockData.shares}
                readOnly
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">
              {stockData?.shares !== undefined ? 'Estimated Cost' : 'Investment Amount'}
            </label>
            <input type="number" className="form-input" value={amount} readOnly />
          </div>

          <div className="order-summary">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span className="summary-label">Stock Tier</span>
                <span className="summary-value">{stockData?.tier || stockData?.name || 'N/A'}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Return</span>
                <span className="summary-value">{stockData?.return || 'N/A'}</span>
              </div>
              {stockData?.bonus && (
                <div className="summary-row">
                  <span className="summary-label">Bonus</span>
                  <span className="summary-value">{stockData.bonus}</span>
                </div>
              )}
              {stockData.items?.length > 0 && (
                <div className="stat-item">
                  <span className="stat-label">Benefit</span>
                  <span className="stat-value">{stockData.items[0]}</span>
                </div>
              )}
              <div className="summary-row">
                <span className="summary-label">
                  {stockData?.shares !== undefined ? 'Estimated Cost' : 'Investment Amount'}
                </span>
                <span className="summary-value">${amount}</span>
              </div>
             
            </div>
          </div>

          <button className="submit-button" onClick={payment}>Review Order</button>
        </div>
      </div>
    </div>
  );
};

export default Order;
