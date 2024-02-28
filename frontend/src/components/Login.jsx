import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/authSlice';
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {

  const loginPara = {
    color: 'grey',
    fontSize: '.8rem',
    paddingBottom: '1rem'
  }

  const user = useSelector(state => state.auth.user);
  const isLoggedin = useSelector(state => state.auth.loggedIn);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isNavigated, setIsNavigated] = useState(false);



  useEffect(() => {
    if (isLoggedin && !isNavigated) {
      console.log(isLoggedin)
      setIsNavigated(true);
      if (user === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [isLoggedin, isNavigated]);

  const navigate = useNavigate()

  const handleLogin = () => {
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    try {
      dispatch(login({ username, password, navigate }));
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-container">

      {/* Left div */}
      <div className='login-left-div'>
        <h2 style={{ fontWeight: '600', fontSize: '1.8rem', paddingBottom: '.6rem' }}>Hello!</h2>
        <p style={loginPara}>Please login to continue</p>
        {error && <div className="error">{error}</div>}
        <form className='login-form'>
          <div className="login-input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              placeholder='John Doe'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="login-input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleLogin} className='login-register-button'>
            Login
          </button>
        </form>
      </div>

      {/* Right div */}
      <div className='login-right-div'>
        <h1 style={{ paddingBottom: '1rem' }}>Apni Dukan</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.6rem' }}>
          <p style={{ fontSize: '.8rem' }}>Do not have Account? </p>
          <Link to="/register" className='link'>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
