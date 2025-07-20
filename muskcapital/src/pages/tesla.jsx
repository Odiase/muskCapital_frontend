import React, { useEffect,useState } from 'react';
import '../assets/styles/tesla.css';
import MobileNavbar from '../components/mobile-nav'; 
import Desktop from '../components/desktop'; 
import teslalogo from '../assets/tesla-logo-png-2244.png'
import { useNavigate } from 'react-router-dom';
const Tesla = () => {
    const [price, setPrice] = useState(0)
 const [tiers, setTiers] = useState([]);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://muskcapital.onrender.com/tsla_price/');
        const data = await response.json();
        setPrice(data.current_price);
      } catch (error) {
        console.log('Error fetching price:', error);
      }
    };

    fetchPrice();
  }, []);

  useEffect(() => {
    if (price !== null) {
      const updatedTiers = [
        { tier: 'Tier 1 – Entry', shares: 100, return: '$15K–$20K' },
        { tier: 'Tier 2 – Growth', shares: 250, return: '$37K–$50K' },
        { tier: 'Tier 3 – Strategic', shares: 500, return: '$74K–$100K' },
        { tier: 'Tier 4 – Visionary', shares: 750, return: '$112K–$150K' },
        { tier: 'Tier 5 – Institutional', shares: 1000, return: '$150K–$200K' },
        { tier: 'Tier 6 – Anchor', shares: 2000, return: '$300K–$400K' },
        { tier: 'Tier 7 – Foundational', shares: 3000, return: '$450K–$600K' },
        { tier: 'Tier 8 – Flagship', shares: 3200, return: '$500K–$670K+' },
      ].map((tier) => ({
        ...tier,
        price,
        amount: (tier.shares * price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      }));

      setTiers(updatedTiers);
      console.log(updatedTiers);
      
    }
  }, [price]);

  const navigate = useNavigate();

 const handleRowClick = (item) => {
  navigate(`/details/tesla/${encodeURIComponent(item.tier)}`, {
    state: {
      ...item,
      stock_name: 'tesla',
      stock_symbol: 'TSLA',
    },
  });
};


  // Intersection Observer effect
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    reveals.forEach((el) => observer.observe(el));

    // Cleanup function
    return () => {
      reveals.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="tesla-page">
     
<MobileNavbar />
       <Desktop />


      <section id="hero" style={{
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url("https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Promo-FTC-Desktop.png")`
}}
>
        <div className="hero-content">
          <h1 className="fade-in-up">
            <img src={teslalogo} alt="Tesla Logo" width="140px" />
          </h1>
          <p className="fade-in-up">To accelerate the world's transition to sustainable energy</p>
          <a href="#" className="btn fade-in-up">Learn More</a>
        </div>
      </section>

      <section id="robotaxi">
        <div className="robotaxi_text feature-box reveal">
          <h1>Robotaxi</h1>
          <p>The Future of Autonomy Is Here</p>
          <button>Coming Soon</button>
        </div>
      </section>

      <section id="solar_panels">
        <div className="text">
          <h2>Solar Panels</h2>
          <p>Use Solar Energy To Power Your Home And Charge Your Tesla</p>
        </div>
      </section>

      <div className="invest_now_container">
        <h2 style={{color:'black'}}>Why Invest Now</h2>

        <div className="card-grid feature-box reveal">
          <div className="card feature-box reveal">
            <h3>1. First-Mover Advantage in Autonomous Mobility</h3>
            <p>
              Tesla is poised to lead in the global ride-hailing market, projected to exceed $330 billion by 2030.
              Tesla's scalable, camera-based FSD system gives it an edge over LiDAR-dependent rivals like Waymo.
            </p>
          </div>

          <div className="card feature-box reveal">
            <h3>2. Multiple Revenue Streams</h3>
            <ul>
              <li>Autonomous ride fares</li>
              <li>FSD software subscriptions ($99–$199/month)</li>
              <li>Charging network revenue</li>
              <li>Profit-sharing with Tesla owners</li>
            </ul>
            <p>
              Ark Invest projects Robotaxi revenue could make up 88% of Tesla's valuation by 2029, with annual
              revenue potential of over $760 billion.
            </p>
          </div>

          <div className="card feature-box reveal">
            <h3>3. Passive Income Potential</h3>
            <p>
              Tesla's decentralized fleet model allows vehicle owners to earn up to $30,000 annually through the
              Robotaxi platform.
            </p>
          </div>

          <div className="card feature-box reveal">
            <h3>4. Environmental & Social Impact</h3>
            <ul>
              <li>Lower urban carbon emissions</li>
              <li>Green mobility access for aging, disabled, and underserved communities</li>
              <li>Reduced private car ownership</li>
              <li>Smarter infrastructure</li>
            </ul>
          </div>

          <div className="card feature-box reveal">
            <h3>5. Strong Market Performance</h3>
            <p>
              Tesla stock rose 71% between April and July 2025, driven by confidence in autonomy and
              infrastructure. Further growth is expected as Robotaxi deployments increase.
            </p>
          </div>
        </div>
      </div>

      <div className="feature-banner">
        <img
          src="https://digitalassets.tesla.com/tesla-contents/image/upload/Homepage-Grid-AI"
          alt="Grok Logo"
          className="grok-logo"
        />
        <div className="feature-text">
          <p className="title">New Feature: In-Car AI</p>
          <p className="subtitle">Grok is now available.</p>
          <button className="learn-more-btn">
            <a href="https://www.tesla.com/support/articles/grok" style={{ color: 'white' }}>
              Learn More
            </a>
          </button>
        </div>
      </div>

       <section className="investment-section feature-box reveal">
      <h2>
        Investment Tiers{' '}
        <span style={{ fontSize: '0.6em', color: '#ccc' }}>
          {`(Realtime stock price $${price}/share)`}
        </span>
      </h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Tier</th>
              <th>Shares</th>
              <th>Investment Amount</th>
              <th>Estimated Annual Return</th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((item, index) => (
              <tr key={index} onClick={() => handleRowClick(item)} style={{ cursor: 'pointer' }}>
    <td>{item.tier}</td>
    <td>{index === 7 ? `${item.shares}+` : item.shares}</td>
    <td>{index === 7 ? `${item.amount}+` : item.amount}</td>
    <td>{item.return}</td>
  </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="note">
        Note: All returns are speculative and based on Ark Invest's forecast of a $2,600 share price by 2029. Actual
        results depend on adoption, regulatory factors, and execution.
      </p>
    </section>
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-left">
            <h2 className="footer-logo">TSLA</h2>
            <p className="footer-tagline">Invest in the Future of Autonomy</p>
          </div>

          <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Investment Tiers</a>
            <a href="#">FAQs</a>
            <a href="#">Contact</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 TSLA Investments. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Tesla;
