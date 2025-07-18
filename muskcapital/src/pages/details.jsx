import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Order from './order';
import { useLocation } from 'react-router-dom';

import teslaCar1 from '../assets/tesla.jpg';
import spacex from '../assets/spacex_background.jpg';
import neuralink from '../assets/neuralink.jpg';
import './details.css';

const Details = () => {
  const [modal, setModal] = useState(false);
  const [stockData, setStockData] = useState(null);
  const { stockname } = useParams();
  const navigate = useNavigate();

const location = useLocation();



useEffect(() => {
  if (location?.state) {
    setStockData(location.state); // object from state
  }
}, [location]);
  const videoStyles = {
    width: '100%',
    maxWidth: '400px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    outline: 'none',
  };

  return (
    <div className="stock-details-container" style={{backgroundColor:'white'}}>
      {modal && (
        <div className="modal-overlay">
          <Order modal={modal} setModal={setModal} stockData={stockData} />
        </div>
      )}
      
      <div className="content-wrapper">
        {/* Header */}
        <div className="header">
          <button onClick={() => window.history.back()} className="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <h2 className="title">{stockname} Stock Details</h2>
        </div>

        {/* Mobile Video Section */}
        

        {/* Main Content */}
        <div className="main-content">
          {/* Left Column */}
          <div className="left-column">
            {/* Stock Image */}
            <div 
              className="stock-image"
              style={{
                backgroundImage: stockname === 'spaceX' 
                  ? `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCnzHFmZWgJWEzoHvcq57b8j4_TkIUmxaKWeOUqykM3ieR9FmEPS9liGsyRb9UVvZixCvW2fEbMQSJQf74sqvbVfzgH5rzIIcZIfb91mPikbGpO1pfVhJ4EeCF73Gmf8qTfgA_SLPnmDX3cy3OTC9ypek0tTwV8xzAjmSspw2IJ6Cfvlul7yO6vgMcZk8zIboawk8sfELYeDObruOn2qz3GMB9N37t8fDbD1DBwEL-pPImlyUo60_G1FOIGPgoLEHA0_GQOwQKf5g")`
                  : `url("${teslaCar1}")`,
                backgroundPosition: stockname === 'tesla' ? '50% 10%' : 'center'
              }}
            />

            {/* Price Section */}
            <div className="price-section">
              <h2>Stock Price</h2>
              <div className="price-display">
                <p className="current-price"> {stockData?.price ?? stockData?.return ?? 315.65}</p>
                <div className="price-change">
                  <span className="time-frame">1Y</span>
                  <span className="change-positive">+15%</span>
                </div>
              </div>

              {/* Chart */}
              
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column">
            {/* Key Statistics */}
            <div className="stats-section">
  <h2>Key Statistics</h2>
  <div className="stats-grid">
    <div className="stat-item">
      <span className="stat-label">Tier</span>
      <span className="stat-value">
        {stockData?.tier || stockData?.name || 'N/A'}
      </span>
    </div>

    {stockData?.shares !== undefined ? (
      <>
        <div className="stat-item">
          <span className="stat-label">Shares</span>
          <span className="stat-value">{stockData.shares}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Amount</span>
          <span className="stat-value">{stockData.amount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Return</span>
          <span className="stat-value">{stockData.return}</span>
        </div>
      </>
    ) : stockData?.profit ? (
      <>
        <div className="stat-item">
          <span className="stat-label">Range</span>
          <span className="stat-value">{stockData.range || 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Return</span>
          <span className="stat-value">{stockData.return || 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Profit</span>
          <span className="stat-value">{stockData.profit || 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Bonus</span>
          <span className="stat-value">{stockData.bonus || 'N/A'}</span>
        </div>
      </>
    ) : stockData?.items ? (
      <>
        <div className="stat-item">
          <span className="stat-label">Range</span>
          <span className="stat-value">{stockData.range}</span>
        </div>
       <div className="stat-item">
  <span className="stat-label">Benefit</span>
  <span className="stat-value">{stockData.items?.[0] || 'N/A'}</span>
</div>

      </>
    ) : null}

    <div className="stat-item">
      <span className="stat-label">Market Cap</span>
      <span className="stat-value">$50B</span>
    </div>
    <div className="stat-item">
      <span className="stat-label">P/E Ratio</span>
      <span className="stat-value">25.5</span>
    </div>
  </div>
</div>
            {/* News Section */}
            
          

            {/* Analyst Ratings */}
            <div className="ratings-section">
              <h2>Analyst Ratings</h2>

              <div className="ratings-content">
                <div className="rating-summary">
                  <p className="rating-score">4.2</p>
                  <div className="stars">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#007bff" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    ))}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#007bff" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
                    </svg>
                  </div>
                  <p className="rating-count">250 reviews</p>
                </div>
                <div className="rating-distribution">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="distribution-row">
                      <span className="rating-number">{rating}</span>
                      <div className="distribution-bar">
                        <div 
                          className="distribution-fill" 
                          style={{ width: `${[30, 40, 15, 10, 5][5 - rating]}%` }}
                        />
                      </div>
                      <span className="distribution-percent">
                        {[30, 40, 15, 10, 5][5 - rating]}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trade Button */}
        <div className="trade-button-container">
          <button onClick={() => setModal(true)} className="trade-button">
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
