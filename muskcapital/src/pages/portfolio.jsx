
import React from 'react';
import './portfolio.css';
import MobileNavbar from '../components/mobile-nav';
import DesktopNav from '../components/desktop';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Portfolio = () => {
    const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
    const [totalValue, setTotalValue] = useState(0);
 useEffect(() => {
    const fetchPortfolio = async () => {
      const token = sessionStorage.getItem('access');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('https://muskcapital.onrender.com/portfolio/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch portfolio data');
        }

        const data = await response.json();
        setPortfolioData(data);
        console.log(data);
          let total = 0;
data?.stocks?.forEach(stock => {
  const quantity = Number(stock.quantity);
  const purchasePrice = parseFloat(stock.purchase_price);
  const isTesla = stock.stock_name.toLowerCase() === 'tesla';
  const currentPrice = purchasePrice * 1.1;

  total += isTesla ? purchasePrice : quantity * currentPrice;
});
setTotalValue(total);

        
      } catch (err) {
        if (err) {
          setError(err.message);
        }
        
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [navigate]);
  

  return (
    <div className="layout-container flex h-full grow flex-col">
      <MobileNavbar />
       <DesktopNav name={portfolioData?.user?.first_name} />


      {/* PC Content */}
      <div className="pc-content gap-1 px-6 flex flex-1 justify-center py-5 mt-10">
        {/* Left Sidebar */}
        <div className="layout-content-container flex flex-col w-80">
          {/* Profile Section */}
          
<section>
            <div className="flex flex-wrap gap-4 px-0  py-6">
              <div className="flex min-w-72 flex-1 flex-col gap-2">
                
               <p className="text-white tracking-light text-[32px] font-bold leading-tight truncate">
  ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
</p>
                <div className="flex gap-1">
                  <p className="text-[#a5b6a0] text-base font-normal leading-normal">1Y</p>
                  <p className="text-[#0bda35] text-base font-medium leading-normal">+12.34%</p>
                </div>
                               
              </div>
            </div>
          </section>
          {/* Account Summary Cards */}
         
        {/* Main Content */}
        <div className="layout-content-container flex flex-col max-w-[1000px] flex-1">
    <div className="mobile-content">
        <section>
            <div className="flex flex-wrap gap-2 px-4 py-1">
              <div className="flex min-w-72 flex-1 flex-col gap-2">
                <p className="text-white text-base font-medium leading-normal">Portfolio Value</p>
                <p className="text-white tracking-light text-[32px] font-bold leading-tight truncate">$12,345.67</p>
                <div className="flex gap-1">
                  <p className="text-[#a5b6a0] text-base font-normal leading-normal">1Y</p>
                  <p className="text-[#0bda35] text-base font-medium leading-normal">+12.34%</p>
                </div>
                               
              </div>
            </div>
          </section>
        
  
     

      </div>


          {/* Holdings Section */}
          <section className='mt-7 holdings'>
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Holdings</h3>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#42513e] bg-[#131712]">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-[#1f251d]">
                      {['Symbol', 'Name', 'Quantity', 'Avg. Cost', 'Last Price', 'Change', 'Value'].map((header) => (
                        <th key={header} className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
  {portfolioData?.stocks?.map((stock, index) => {
    const quantity = Number(stock.quantity);
    const purchasePrice = parseFloat(stock.purchase_price);
    const currentPrice = purchasePrice * 1.1; // Simulated +10%
    const change = ((currentPrice - purchasePrice) / purchasePrice) * 100;

    // Tesla-specific logic: use raw purchasePrice for value
    const value = stock.stock_name.toLowerCase() === 'tesla'
      ? purchasePrice
      : quantity * currentPrice;

    return (
      <tr key={stock.id} className="border-t border-t-[#42513e]">
        <td className="h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
          {stock.stock_symbol}
        </td>
        <td className="h-[72px] px-4 py-2 w-[400px] text-[#a5b6a0] text-sm font-normal leading-normal">
          {stock.stock_name}
        </td>
        <td className="h-[72px] px-4 py-2 w-[400px] text-[#a5b6a0] text-sm font-normal leading-normal">
          {quantity}
        </td>
        <td className="h-[72px] px-4 py-2 w-[400px] text-[#a5b6a0] text-sm font-normal leading-normal">
          ${purchasePrice.toFixed(2)}
        </td>
        <td className="h-[72px] px-4 py-2 w-[400px] text-[#a5b6a0] text-sm font-normal leading-normal">
          ${currentPrice.toFixed(2)}
        </td>
        <td className="h-[72px] px-4 py-2 w-[400px] text-[#a5b6a0] text-sm font-normal leading-normal">
          {change >= 0 ? '+' : '-'}{Math.abs(change).toFixed(2)}%
        </td>
        <td className="h-[72px] px-4 py-2 w-[400px] text-[#a5b6a0] text-sm font-normal leading-normal">
          ${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </td>
      </tr>
    );
  })}
</tbody>

                </table>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Mobile Content */}
  
      {/* Mobile Footer Navigation */}
     
    </div>
  );
};

export default Portfolio;
