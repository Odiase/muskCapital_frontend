
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
    let total = 0;
data?.stocks?.forEach(stock => {
  const quantity = Number(stock.quantity);
  const purchasePrice = parseFloat(stock.purchase_price);
  const isTesla = stock.stock_name.toLowerCase() === 'tesla';
  const currentPrice = purchasePrice * 1.1; // Simulated current value

  total += isTesla ? purchasePrice : quantity * currentPrice;
});
setTotalValue(total);

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
          {[
            { 
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M216,72H56a8,8,0,0,1,0-16H192a8,8,0,0,0,0-16H56A24,24,0,0,0,32,64V192a24,24,0,0,0,24,24H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72Zm0,128H56a8,8,0,0,1-8-8V86.63A23.84,23.84,0,0,0,56,88H216Zm-48-60a12,12,0,1,1,12,12A12,12,0,0,1,168,140Z" />
                </svg>
              ),
              title: "$2,345.67",
              subtitle: "Available to trade"
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z" />
                </svg>
              ),
              title: "$2,345.67",
              subtitle: "Buying Power"
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z" />
                </svg>
              ),
              title: "$0.00",
              subtitle: "Margin Balance"
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z" />
                </svg>
              ),
              title: "$2,345.67",
              subtitle: "Cash Balance"
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z" />
                </svg>
              ),
              title: "$2,345.67",
              subtitle: "Settled Funds"
            }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4 bg-[#131712] px-4 min-h-[72px] py-2">
              <div className="text-white flex items-center justify-center rounded-lg bg-[#2d372a] shrink-0 size-12">
                {item.icon}
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-white text-base font-medium leading-normal line-clamp-1">{item.title}</p>
                <p className="text-[#a5b6a0] text-sm font-normal leading-normal line-clamp-2">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

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
