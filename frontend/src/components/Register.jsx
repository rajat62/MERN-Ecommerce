import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/authSlice';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

  const registerPara = {
    color: 'grey',
    fontSize:'.8rem',
    paddingBottom: '1rem'
  }

  const dispatch = useDispatch();

  const loggedIn = useSelector(state => state.auth.loggedIn);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate()
  const { username, email, password, confirmPassword } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      await dispatch(register({ formData, navigate }));
      console.log(loggedIn)

    }
  };

  return (

    <div className="register-container">

      {/* Left div */}
      <div className='register-left-div'>
        <h2 style={{ fontWeight: '600', fontSize: '1.8rem', paddingBottom: '.6rem' }}>Hello!</h2>
        <p style={registerPara}>Please Signup to continue</p>
        <form onSubmit={handleSubmit} className='regitser-form'>
          <div className='register-input-group'>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder='John Doe'
              required
            />
          </div>
          <div className='register-input-group'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder='johndoe@gmail.com'
              required
            />
          </div>
          <div className='register-input-group'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder='Password'
              required
            />
          </div>
          <div className='register-input-group'>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder='Confirm Password'
              required
            />
          </div>
          <button type="submit" className='login-register-button'>Register</button>
        </form>
      </div>

      {/* Right div */}
      <div className='register-right-div'>
        <h1 style={{paddingBottom: '1rem'}}>Apni Dukan</h1>
        <div style={{display:'flex', flexDirection:'column', alignItems: 'center', gap:'.6rem'}}>
          <p style={{fontSize:'.8rem'}}>Have an Account? </p>
          <Link to="/login" className='link'>Login</Link>
        </div>
      </div>
    
    </div>

  );
};

export default Register;
