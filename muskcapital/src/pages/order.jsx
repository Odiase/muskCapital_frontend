import React, { useState, useEffect } from 'react';
import './order.css';
import { useNavigate } from 'react-router-dom';

const Order = ({ modal, setModal, stockData }) => {
  const [inputValue, setInputValue] = useState('');
  const [amount, setAmount] = useState(0);
  const [returnamount, setReturnamount] = useState(0);
  const [rangeError, setRangeError] = useState('');

  useEffect(() => {
    const price = stockData?.price || 0;
    const userAmount = parseFloat(inputValue) || 0;

    if (stockData?.shares !== undefined) {
      const shares = parseFloat(stockData.shares.toString().replace(/,/g, '')) || 0;
      const total = Math.ceil(price * shares);
      setAmount(total);
      setReturnamount(total);
    } else {
      const isNeuralink = (stockData?.name || '').toLowerCase().includes('neuralink');

      if (isNeuralink) {
        setReturnamount(userAmount + Math.ceil(userAmount * 0.41));
        setAmount(userAmount);
      } else {
        const match = stockData?.return?.match(/\d+/);
        const returnRate = match ? parseFloat(match[0]) : 0;
        const expected = userAmount + (userAmount * (returnRate / 100));
        setAmount(userAmount);
        setReturnamount(Math.ceil(expected));
      }
    }
  }, [inputValue, stockData]);
const handleInputChange = (e) => {
  const raw = e.target.value.replace(/^0+(?=\d)/, '');
  const numericVal = parseInt(raw);
  const range = stockData?.range || '';
  let min = null;
  let max = null;

  // Match "$50,000 – $99,999"
  const standardMatch = range.match(/\$?([\d,]+)\s*[\–-]\s*\$?([\d,]+)/);
  if (standardMatch) {
    min = parseInt(standardMatch[1].replace(/,/g, ''));
    max = parseInt(standardMatch[2].replace(/,/g, ''));
  } else {
    // Match "$10 Million+" etc.
    const minOnlyMatch = range.match(/\$?([\d.,]+)\s*(Million|Billion)?\s*\+/i);
    if (minOnlyMatch) {
      const base = parseFloat(minOnlyMatch[1].replace(/,/g, ''));
      const multiplier = minOnlyMatch[2]?.toLowerCase() === 'billion' ? 1_000_000_000 :
                         minOnlyMatch[2]?.toLowerCase() === 'million' ? 1_000_000 : 1;
      min = Math.floor(base * multiplier);
    }
  }

  // Set error only; don't block typing
  if (!isNaN(numericVal)) {
    if (min !== null && numericVal < min) {
      setRangeError(`Minimum allowed amount is $${min.toLocaleString()}`);
    } else if (max !== null && numericVal > max) {
      setRangeError(`Maximum allowed amount is $${max.toLocaleString()}`);
    } else {
      setRangeError('');
    }
  } else {
    setRangeError('');
  }

  setInputValue(raw);
};



  const navigate = useNavigate();
  const payment = () => {
    navigate('/payment', {
      state: {
        stockData: {
          ...stockData,
          amount,
        },
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
              />
              {stockData?.range && (
                <p style={{ marginTop: '5px', fontSize: '0.85rem', color: '#888' }}>
                  Allowed range: {stockData.range}
                </p>
              )}
              {rangeError && (
                <p style={{ color: 'red', fontSize: '0.85rem', marginTop: '3px' }}>{rangeError}</p>
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
              {stockData?.shares !== undefined ? 'Estimated Cost' : 'Expected Return'}
            </label>
            <input type="number" className="form-input" value={returnamount} readOnly />
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
                  {stockData?.shares !== undefined ? 'Estimated Cost' : 'Expected Return'}
                </span>
                <span className="summary-value">${returnamount}</span>
              </div>
            </div>
          </div>

         <button
  className="submit-button"
  onClick={payment}
  disabled={
    (stockData?.shares === undefined && (!inputValue || !!rangeError))
  }
  style={{
    opacity:
      stockData?.shares === undefined && (!inputValue || !!rangeError)
        ? 0.6
        : 1,
    cursor:
      stockData?.shares === undefined && (!inputValue || !!rangeError)
        ? 'not-allowed'
        : 'pointer',
  }}
>
  Pay
</button>


        </div>
      </div>
    </div>
  );
};

export default Order;
