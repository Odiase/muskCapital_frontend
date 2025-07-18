import React from 'react';
import '../assets/styles/index.css';
import elonBackground from '../assets/elon_background.jpg';
import { Link } from 'react-router-dom';
import MobileNavbar from '../components/mobile-nav';
import DesktopNav from '../components/desktop';

// Import images (you'll need to add these files to your project)
import spacexLogo from '../assets/spacex-logo-svgrepo-com.svg';
import teslaLogo from '../assets/tesla-logo-png-2244.png';
import neuralinkLogo from '../assets/neuralink_logo.svg';

const Home = () => {
  React.useEffect(() => {
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
  }, []);

  return (
    <div>
      <MobileNavbar />
      <DesktopNav />

      {/* HERO SECTION */}
      <section className="hero" style={{
    backgroundImage: `url(${elonBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100vh",
    position: "relative",
  }}>
        <div className="hero-overlay fade-in-up">
          <h1>MuskCapital</h1>
          <p>Explore, Invest & Support the Future of Humanity</p>
        </div>
      </section>

      {/* VENTURE SELECTION */}
      <section className="ventures feature-box reveal">
        <div className="venture-card">
          <h2>SpaceX</h2>
          <p>Revolutionizing space travel, Mars colonization, and beyond.</p>
          <Link to="spacex" className="btn">Explore SpaceX</Link>
        </div>
        <div className="venture-card">
          <h2>Tesla</h2>
          <p>Leading electric vehicle and energy innovations.</p>
          <Link to="tesla" className="btn">Explore Tesla</Link>
        </div>
        <div className="venture-card">
          <h2>Neuralink</h2>
          <p>Connecting human brains to technology for medical breakthroughs.</p>
          <Link to="neuralink" className="btn">Explore Neuralink</Link>
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="vision-section">
        <div className="vision-content feature-box reveal">
          <h2>A Unified Vision for Humanity's Future</h2>
          <p>Elon Musk's companies work together to transform transportation, energy, and the human brain — paving the way
            for a sustainable, multi-planetary future.</p>
          <div className="vision-icons">
           <Link to='spacex'>  <div><img src={spacexLogo} alt="SpaceX Icon" /><span>SpaceX</span></div></Link>
           <Link to='tesla'> <div><img src={teslaLogo} alt="Tesla Icon" /><span>Tesla</span></div></Link>
            <Link to='neuralink'><div><img src={neuralinkLogo} alt="Neuralink Icon" /><span>Neuralink</span></div></Link>
          </div>
          <a href="#" className="vision-btn">Explore the Vision</a>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="benefits">
        <h2>Why Invest in MuskCapital?</h2>
        <div className="benefit-grid feature-box reveal">
          <div className="benefit-card">
            <h3>High ROI Potential</h3>
            <p>Each venture has shown consistent growth & innovation.</p>
          </div>
          <div className="benefit-card">
            <h3>Future-Proof</h3>
            <p>You're investing in technologies of the future.</p>
          </div>
          <div className="benefit-card">
            <h3>Exclusive Access</h3>
            <p>Priority updates and early access to products.</p>
          </div>
          <div className="benefit-card">
            <h3>Impact-Driven</h3>
            <p>Your funds contribute to global change and progress.</p>
          </div>
          <div className="benefit-card">
            <h3>Trusted Leadership</h3>
            <p>Led by one of the most visionary minds of our time.</p>
          </div>
        </div>
      </section>

      {/* INVESTORS SECTION */}
      <section className="testimonials-section">
        <h2>What Investors Are Saying</h2>
        <div className="testimonials-grid feature-box reveal">
          <div className="testimonial-card">
            <p>"Investing in Tesla early changed my life. The growth has been unbelievable."</p>
            <div className="author">— J.D., Investor since 2018</div>
          </div>
          <div className="testimonial-card">
            <p>"Being part of Neuralink's mission feels like being on the edge of the future."</p>
            <div className="author">— A.O., Biotech Angel</div>
          </div>
          <div className="testimonial-card">
            <p>"SpaceX's commercial success has proven that private spaceflight is the next frontier."</p>
            <div className="author">— M.R., Aerospace Fund</div>
          </div>
        </div>
      </section>

      {/* DONATION SECTION */}
      <section className="donate">
        <h2>Support the Mission</h2>
        <p>Contributors enjoy early previews, networking opportunities, and gift perks from our ventures.</p>
        <Link to="payment" className="btn donate-btn">Donate Now</Link>
      </section>

      {/* FOOTER */}
      <footer>
        <p>&copy; 2025 Elon Musk Ventures. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;