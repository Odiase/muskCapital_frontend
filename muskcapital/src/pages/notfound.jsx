import React from 'react';
import MobileNavbar from '../components/mobile-nav';
import DesktopNav from '../components/desktop';
import notfound from '../assets/notfound.jpeg';

const styles = `
#hero {
  position: relative;
  width: 100%;
  height: 100vh;
  color: white;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
#hero .hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#hero .hero-content h1 {
  margin-bottom: 10px;
  font-size: 3rem;
}
.btn {
  margin-top: 4rem;
  padding: 0.75rem 1.5rem;
  background: #e82127;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
}
`;

const NotFound = () => {
  return (
    <>
      <MobileNavbar />
      <DesktopNav />
      <style>{styles}</style>
      <section
        id="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(${notfound})`,
        }}
      >
        <div className="hero-content">
          <h1 className="fade-in-up">
            
          </h1>

          <a href="/" className="btn fade-in-up">Go home</a>
        </div>
      </section>
    </>
  );
};

export default NotFound;
