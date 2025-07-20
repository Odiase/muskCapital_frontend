import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DesktopNav from '../components/desktop';
import MobileNavbar from '../components/mobile-nav';
import image2 from '../assets/starship_spacex.webp';
import { useNavigate } from 'react-router-dom';


// Add this CSS to your stylesheet or create a new CSS file
const styles = `
  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9fafb;
  }

  .login-content {
    width: 97%;
    height: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding: 1rem;
  }

  @media (min-width: 1024px) {
    .login-content {
      flex-direction: row;
    }
  }

  .login-image-section {
    display: none;
    width: 60%;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  @media (min-width: 1024px) {
    .login-image-section {
      display: block;
      width: 50%;
    }
    .login-image {
    width: 100%;
    height: 480px;
    object-fit: cover;
  }
  }

  .login-image {
    width: 100%;
    height: 480px;
    object-fit: cover;
  }

  .login-form-section {
    width: 100%;
    background-color: white;
    padding: 1rem;
    border-radius: 0.75rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    max-width: 32rem;
  }

  @media (min-width: 1024px) {
    .login-form-section {
      width: 50%;
    }
  }

  .login-header {
    text-align: center;
    margin-bottom: 0.7rem;
  }

  .login-title {
    font-size: 1.875rem;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 0.3rem;
  }

  .login-subtitle {
    color: #6b7280;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-group {
    margin-bottom: 0.6rem;
  }

  .form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.2rem;
  }

  .form-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 1rem;
    
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  .form-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }

  .password-wrapper {
    position: relative;
  }

  .toggle-password {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6b7280;
    background: none;
    border: none;
    cursor: pointer;
  }

  .toggle-password:hover {
    color: #374151;
  }

  .form-options {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .checkbox-group {
    display: flex;
    align-items: center;
  }

  .checkbox-input {
    width: 1rem;
    height: 1rem;
    color: #3b82f6;
    border-color: #d1d5db;
    border-radius: 0.25rem;
    margin-right: 0.5rem;
  }

  .forgot-password {
    font-size: 0.875rem;
    color: #3b82f6;
    font-weight: 500;
    text-decoration: none;
  }

  .forgot-password:hoverLog in {
    color: #2563eb;
  }

  .submit-btn {
    width: 100%;
    background-color: #3b82f6;
    color: white;
    padding: 0.75rem 0.8rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .submit-btn:hover {
    background-color: #2563eb;
  }

  .submit-btn:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }

  .signup-link {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 0.875rem;
    color: #6b7280;
  }

  .signup-link a {
    color: #3b82f6;
    font-weight: 500;
    text-decoration: none;
  }

  .signup-link a:hover {
    color: #2563eb;
  }

  .success-message {
    color: #16a34a;
    font-size: 0.875rem;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .error-message {
    color: #dc2626;
    font-size: 0.875rem;
    text-align: center;
    margin-bottom: 0.5rem;
  }
    .spinner {
  animation: spin 1s linear infinite;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
`;

const Login = () => {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
setIsLoggingIn(true); 
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('https://muskcapital.onrender.com/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        sessionStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.access);
        setSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setErrorMessage(data.message || 'Login failed');
        console.error('Login failed:', data);
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again.');
      console.error('Error:', error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <>
      <style>{styles}</style>
      <MobileNavbar />
      <nav className="desktop-nav" style={{ color: 'white', backgroundColor: 'black', height: '70px', padding: '0px' }}>
        <div className="navdiv">
          <div id="logo">
            <Link to="/" style={{ fontFamily: 'arial', fontWeight: 'bold' }}>MuskCapital</Link>
          </div>
          <ul>
            <li>
              <Link to="/tesla">Tesla</Link>
            </li>
             <li>
              <Link to="/spacex">SpaceX</Link>
            </li>
            <li>
              <Link to="/neuralink">Neuralink</Link>
            </li>
           
              <li><Link to="/signup">Signup</Link></li>
            
          </ul>
        </div>
      </nav>
      <div className="login-container">
        <div className="login-content">
          {/* Image Section - Hidden on mobile */}
          <div className="login-image-section">
            <img
              src={image2}
              alt="SpaceX Starship"
              className="login-image"
            />
          </div>
          
          {/* Login Form Section */}
          <div className="login-form-section">
            <div className="login-header">
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-subtitle">Sign in to your MuskCapital account</p>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              {/* Username Field */}
              {successMessage && (
                <p className="success-message">{successMessage}</p>
              )}

              {errorMessage && (
                <p className="error-message">{errorMessage}</p>
              )}
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username or Email
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-input"
                  placeholder="elon@spacex.com"
                />
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-input"
                    style={{ paddingRight: '3rem' }}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="toggle-password"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="form-options">
                <div className="checkbox-group">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={toggleRememberMe}
                    className="checkbox-input"
                  />
                  <label htmlFor="remember-me" className="form-label" style={{ marginBottom: 0, marginLeft: '0.5rem' }}>
                    Remember me
                  </label>
                </div>

                <div>
                  <a href="#" className="forgot-password">
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Login Button */}
              <button
  type="submit"
  className="submit-btn"
  disabled={isLoggingIn}
>
  {isLoggingIn ? (
    <>
      <svg className="spinner" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      Logging in...
    </>
  ) : 'Log in'}
</button>
            </form>

            {/* Sign Up Link */}
            <div className="signup-link">
              <p>
                Don't have an account?{' '}
                <Link to="/signup" className="signup-link">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
