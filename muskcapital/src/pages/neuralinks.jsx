import React, { useEffect } from 'react';
import '../assets/styles/neuralink.css';
import Desktop from '../components/desktop';
import MobileNavbar from '../components/mobile-nav';
import { useNavigate } from 'react-router-dom';

const Neuralink = () => {
    const navigate = useNavigate()
const handleClick = (tier) => {
  navigate(`/details/${tier.name}`, {
    state: {
      ...tier,
      stock_name: 'neuralink',
      stock_symbol: 'Neuralink',
    }, // pass the selected tier data
  });
};
        const neuralinkTiers = [
    {
        name: "Observer Tier",
        range: "$30,000 – $150,000",
        items: [
        "Annual ROI: Up to 30% fixed return",
        "Access: Early updates, investor webinars",
        "Exit: Capital return after 3 years",
        ],
    },
  {
    name: "Innovator Tier",
    range: "$150,000 – $500,000",
    items: [
      "Annual ROI: 35% + performance bonuses",
      "Access: Beta programs, networking events",
      "Exit: Flexible exit with profit share",
    ],
  },
  {
    name: "Pioneer Tier",
    range: "$500,000 – $2 Million",
    items: [
        "Annual ROI: 40% + potential patent equity",
        "Access: Private strategy sessions",
        "Perk: 1–2% from early products",
        "Exit: Convertible to equity after 5 years",
        ],
    },
    {
        name: "Strategic Partner",
        range: "$2 Million – $10 Million",
        items: [
        "Annual ROI: 45% + 3–5% revenue participation",
        "Access: Innovation voting rights",
        "Equity: Priority in spin-offs",
        "Exit: Full conversion to equity",
        ],
    },
    {
        name: "Founding Partner",
        range: "$10 Million+",
        items: [
        "Annual ROI: 5–7% core tech revenue",
        "Access: Lifetime privilege, co-branding",
        "Equity: Founding stake + subsidiaries",
        "Perk: Regional exclusivity rights",
        "Exit: Flexible, inheritable ownership",
        ],
        className: "founder",
    },
    ];

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
    <div className="neuralink-page">
      

      <MobileNavbar />
       <Desktop />

      <section className="hero-container">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="https://neuralink.com/assets/static/neuralinkIntro.BLFlcxWZ.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-overlay fade-in-up">
          <h1>
            From neural signals to life-changing impact
          </h1>
          <p>
            Neuralink is developing ultra-high bandwidth brain-machine interfaces to merge humans with AI. Join us on
            the frontier of neuroscience and technology.
          </p>
          <button className="cta-btn">Explore Opportunities</button>
        </div>
      </section>

      <section className="neuralink-section feature-box reveal">
        <div className="neuralink-content">
          <div className="left">
            <h1>
              Building brain<br />
              interfaces to restore<br />
              <span className="underscore">control_</span>
            </h1>
          </div>
          <div className="right">
            <p>
              Our brain-computer interface translates neural signals into actions. In our clinical trials, people
              are using Neuralink devices to control computers and robotic arms with their thoughts.
              <br />
              <br />
              This technology will restore autonomy to those with unmet medical needs and unlock new dimensions of
              human potential.
            </p>
          </div>
        </div>
      </section>

      <a
        href="https://x.com/neuralink/status/1938643490600276142"
        target="_blank"
        rel="noopener noreferrer"
        className="neuralink-banner feature-box reveal"
      >
        <span>Watch the latest update from the Neuralink team on X</span>
      </a>

      <section className="prime-study-section">
        <div className="prime-content feature-box reveal">
          <h2>Neuralink's PRIME Study</h2>
          <p className="highlight">
            If you have limited or no ability to use both hands due to cervical spinal cord injury or amyotrophic
            lateral sclerosis (ALS), you may qualify.
          </p>

          <div className="video-wrapper">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/z7o39CzHgug"
              title="Neuralink PRIME Study"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>

          <p>
            The <strong>PRIME Study</strong> – an investigational medical device trial for our fully-implantable,
            wireless brain-computer interface (BCI) – aims to evaluate the safety of our implant and surgical robot,
            and assess the initial functionality of our BCI for enabling people with quadriplegia to control
            external devices with their thoughts.
          </p>

          <p>
            This study involves placing a small, cosmetically invisible implant in a part of the brain that plans
            movements. The device is designed to interpret a person's neural activity, so they can operate a
            computer or smartphone by simply intending to move – no wires or physical movement are required.
          </p>

          <p>
            This research may help us find safer, more effective ways to implant and use our BCI to potentially
            restore and enhance computer control and other capabilities.
          </p>

          <p className="highlight">
            If you have limited or no ability to use both hands due to cervical spinal cord injury or amyotrophic
            lateral sclerosis (ALS), you may qualify.
          </p>
        </div>
      </section>

      <section className="tiers-section">
        <h2>Neuralink Investment Tiers</h2>
        <p>Choose a tier that aligns with your vision and impact goals.</p>

        <div className="cards-container feature-box reveal">
          {/* Tier 1 */}
         {neuralinkTiers.map((tier, index) => (
  <div className={`card ${tier.className || ''}`} key={index}>
    <h3>{tier.name}</h3>
    <div className="tier-range">({tier.range})</div>
    <ul>
      {tier.items.map((item, i) => {
        const [label, value] = item.split(":");
        return (
          <li key={i}>
            <strong>{label}:</strong> {value?.trim()}
          </li>
        );
      })}
    </ul>
    <button onClick={() => handleClick(tier)}>Join Now</button>
  </div>
))}

        </div>
      </section>

      <footer className="neuralink-footer">
        <div className="footer-content">
          <div className="footer-left">
            <h3>Neuralink</h3>
            <p>&copy; 2025 Neuralink. All rights reserved.</p>
          </div>

          <div className="footer-right">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="https://x.com/neuralink" target="_blank" rel="noopener noreferrer">
              Follow us on X
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Neuralink;
