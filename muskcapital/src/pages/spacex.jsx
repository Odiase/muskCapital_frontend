import React, { useEffect } from 'react';
import '../assets/styles/spacex.css';
import SpaceXLogo from '../assets/SpaceX-Logo.svg';
import Falcon9Image from '../assets/f9.jpg';
import StarshipImage from '../assets/starship_spacex.webp';
import DragonImage from '../assets/dragon_spacex.jpg';
import MobileNavbar from '../components/mobile-nav';
import DesktopNav from '../components/desktop';
import { useNavigate } from 'react-router-dom';
const SpaceXPage = () => {
  const navigate = useNavigate();

  const handleClick = (tier) => {
  navigate(`/details/${tier.name}`, {
    state: {
      ...tier,
      stock_name: 'spacex',
      stock_symbol: 'spaceX',
    }, // pass the selected tier data
  });
};
const tiers = [
  {
    name: 'Explorer Tier',
    range: '($50,000 – $99,999)',
    return: '20% fixed',
    profit: '$10,000 – $19,999',
    bonus: 'Early aerospace tech insights',
    price:316.65
  },
     {
    name: 'Falcon Tier',
    range: '($100,000 – $249,999)',
    return: '30% fixed',
    profit: '$30,000 – $74,999',
    bonus: 'Private events & updates',
    className: 'falcon',
    price:316.65},
  {
    name: 'Dragon Tier',
    range: '($250,000 – $499,999)',
    return: '35% fixed',
    profit: '$87,500 – $174,999',
    bonus: 'Priority project involvement',
    className: 'dragon',
    price:316.65},
  {
    name: 'Starship Tier',
    range: '($500,000+)',
    return: '40% fixed',
    profit: '$200,000+',
    bonus: 'VIP tours, exec briefings, priority ventures',
    className: 'starship',
    price:316.65},
];


  useEffect(() => {
    document.querySelectorAll('.slide').forEach(slide => {
      slide.style.animationPlayState = 'running';
    });

    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));

    return () => {
      reveals.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
    <MobileNavbar />
    <DesktopNav />
    <div className="spacex-page">
      

      <section id="hero">
        <div className="hero-content">
          <h1 className="fade-in-up"><img src={SpaceXLogo} alt="SpaceX Logo" /></h1>
          <p className="fade-in-up">Join Elon Musk's Vision to make life multiplanetary</p>
          <a href="#details-section" className="btn fade-in-up">Learn More</a>
        </div>
      </section>

      <h2 className="feature-box reveal" style={{ margin: '70px auto', color: 'white', textAlign: 'center', fontWeight: 400, fontSize: '2.2rem' }}>
        CORE PROGRAMS
      </h2>

      <section className="core_programs">
        <div className="slides-container feature-box reveal">
          <div 
            className="slide" 
            style={{ backgroundImage: `url(${Falcon9Image})` }}
          >
            <div className="slide-info details-section">
              <h2>Falcon 9</h2>
              <p>Falcon 9 is a reusable, two-stage rocket designed and manufactured by SpaceX for the reliable and
                safe transport of people and payloads into Earth orbit and beyond.</p>
            </div>
          </div>

          <div 
            className="slide" 
            style={{ backgroundImage: `url(${StarshipImage})` }}
          >
            <div className="slide-info">
              <h2>Starship</h2>
              <p>Starship is the world's most powerful launch vehicle ever developed, capable of carrying up to 150
                metric tonnes fully reusable and 250 metric tonnes expendable.</p>
            </div>
          </div>

          <div 
            className="slide" 
            style={{ backgroundImage: `url(${DragonImage})` }}
          >
            <div className="slide-info">
              <h2>Dragon Spacecraft</h2>
              <p>The Dragon spacecraft is capable of carrying up to 7 passengers to and from Earth orbit, and
                beyond. It is the only spacecraft currently flying that is capable of returning significant cargo to
                Earth.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="valuations">
        <h1 className="valuation_text feature-box reveal">Valuation of over $180 billion</h1>

        <div className="data_container">
          <div className="data feature-box reveal">
            <h1>300+</h1>
            <small>Successful Launches</small>
          </div>
          <div className="data feature-box reveal">
            <h1>6000+</h1>
            <small>Satellites in orbit</small>
          </div>
          <div className="data feature-box reveal">
            <h1>500+</h1>
            <small>Successful Missions</small>
          </div>
        </div>
      </section>

      <section className="youtube-section">
        <div className="youtube-container">
          <iframe 
            src="https://www.youtube.com/embed/BJZ5ShqAmDY?autoplay=1&mute=1&rel=0&showinfo=0&controls=1"
            title="SpaceX Launch Video" 
            frameBorder="0" 
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <section className="spacex-section">
        <h2>SpaceX Investment Tiers & Profit Model</h2>
        <p>Back the future of space with bold returns and elite access.</p>

        <div className="tier-grid">
      {tiers.map((tier, index) => (
        <div key={index} className={`tier-card ${tier.className || ''}`}>
          <h3>{tier.name}</h3>
          <div className="tier-range">{tier.range}</div>
          <ul className="tier-details">
            <li><strong>Annual Return:</strong> {tier.return}</li>
            <li><strong>Expected Profit:</strong> {tier.profit}</li>
            <li><strong>Bonus:</strong> {tier.bonus}</li>
          </ul>
          <button onClick={() => handleClick(tier)}>Join {tier.name.split(' ')[0]}</button>
        </div>
      ))}
    </div>
      </section>

      <footer className="spacex-footer">
        <div className="footer-container">
          <div className="footer-left">
            <p>&copy; 2025 SpaceX. All rights reserved.</p>
          </div>
          <div className="footer-right">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Contact</a>
            <a href="#">Careers</a>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default SpaceXPage;