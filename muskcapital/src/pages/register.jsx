import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DesktopNav from '../components/desktop';
import MobileNavbar from '../components/mobile-nav';
import image2 from '../assets/starship_spacex.webp';
import '../assets/styles/tesla.css';

// Add this CSS to your stylesheet or create a new CSS file
const styles = `
  .register-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9fafb;
  }

  .register-content {
    width: 96vw;
    height: 780px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.4rem;
  }

  @media (min-width: 1024px) {
    .register-content {
      flex-direction: row;
    }
  }

  .register-image-section {
    display: none;
    width: 50%;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  @media (min-width: 1024px) {
    .register-image-section {
      display: block;
    }
  }

  .register-image {
    width: 100%;
    height: 490px;
    object-fit: cover;
  }

  .register-form-section {
    width: 100%;
    background-color: white;
    padding: 2rem;
    border-radius: 0.75rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    max-width: 28rem;
  }

  @media (min-width: 1024px) {
    .register-form-section {
      width: 50%;
    }
  }

  .register-header {
    text-align: center;
    margin-bottom: 0.3rem;
  }

  .register-title {
    font-size: 1.8rem;
    font-weight: bold;
    color: #1f2937;
  }

  .error-message {
    margin-bottom: 0.3rem;
    padding: 0.75rem;
    background-color: #fee2e2;
    color: #b91c1c;
    border-radius: 0.5rem;
    font-size: 0.8rem;
  }

  .register-form {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .form-group {
    margin-bottom: 0.5rem;
  }

  .form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
  }

  .form-label-required:after {
    content: '*';
    color: #ef4444;
    margin-left: 0.25rem;
  }

  .form-input {
    width: 100%;
    padding: 0.4rem 0.55rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  .form-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }

  .form-input-error {
    border-color: #ef4444;
  }

  .form-error {
    margin-top: 0.05rem;
    font-size: 0.75rem;
    color: #dc2626;
  }

  .password-hint {
    margin-top: 0.05rem;
    font-size: 0.7rem;
    color: #6b7280;
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

  .checkbox-label {
    font-size: 0.6rem;
    color: #374151;
  }

  .submit-btn {
    width: 100%;
    background-color: #3b82f6;
    color: white;
    padding: 0.3rem 0.6rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.6rem;
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

  .submit-btn-disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spinner {
    animation: spin 1s linear infinite;
    margin-right: 0.75rem;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .login-link {
    margin-top: 0.4rem;
    text-align: center;
    font-size: 0.875rem;
    color: #6b7280;
  }

  .login-link a {
    color: #3b82f6;
    font-weight: 500;
    text-decoration: none;
  }

  .login-link a:hover {
    color: #2563eb;
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const res = await fetch('https://muskcapital.onrender.com/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Store token if remember me is checked
        if (rememberMe && data.token) {
          localStorage.setItem('authToken', data.token);
        }
        alert('Registration successful! Redirecting..');
        navigate('/login');
      } else {
        const errorMsg = data.detail || 
                        (data.errors ? Object.values(data.errors).join(' ') : 'Registration failed');
        setSubmitError(errorMsg);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <nav className="desktop-nav" style={{color:'white',backgroundColor:'black',height:'70px',padding:'0px'}}>
        <div className="navdiv">
          <div id="logo">
            <a href="#" style={{fontFamily:'arial',fontWeight:'bold'}}>MuskCapital</a>
          </div>
          <ul>
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Portfolio</a>
            </li>
            <button>
              <a href="">Login</a>
            </button>
          </ul>
        </div>
      </nav>
      
      <div className="register-container">
        <div className="register-content">
          {/* Image Section - Hidden on mobile */}
          
          
          {/* Registration Form Section */}
          <div className="register-form-section">
            <div className="register-header">
              <h1 className="register-title">Create Account</h1>
              <h3 className="" style={{color:'black'}}>Join us today and earn high yield returns</h3>
            </div>

            {submitError && (
              <div className="error-message">
                {submitError}
              </div>
            )}

            <form className="register-form" onSubmit={handleSubmit}>
              {/* First Name Field */}
              <div className="form-group">
                <label htmlFor="first_name" className="form-label form-label-required">
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`form-input ${errors.first_name ? 'form-input-error' : ''}`}
                  placeholder="Elon"
                />
                {errors.first_name && <p className="form-error">{errors.first_name}</p>}
              </div>

              {/* Last Name Field */}
              <div className="form-group">
                <label htmlFor="last_name" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Musk"
                />
              </div>

              {/* Username Field */}
              <div className="form-group">
                <label htmlFor="username" className="form-label form-label-required">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`form-input ${errors.username ? 'form-input-error' : ''}`}
                  placeholder="musk01"
                />
                {errors.username && <p className="form-error">{errors.username}</p>}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label form-label-required">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                  placeholder="elon@spacex.com"
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password" className="form-label form-label-required">
                  Password
                </label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input ${errors.password ? 'form-input-error' : ''}`}
                    style={{ paddingRight: '3rem' }}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="toggle-password"
                    aria-label={showPassword ? "Hide password" : "Show password"}
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
                {errors.password && <p className="form-error">{errors.password}</p>}
                <p className="password-hint">Use 8 or more characters</p>
              </div>

              {/* Remember Me */}
              <div className="checkbox-group">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={toggleRememberMe}
                  className="checkbox-input"
                />
                <label htmlFor="remember-me" className="checkbox-label">
                  Remember me
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`submit-btn ${isSubmitting ? 'submit-btn-disabled' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    
                    Processing...
                  </>
                ) : 'Register'}
              </button>
            </form>

            {/* Login Link */}
            <div className="login-link">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="login-link">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
