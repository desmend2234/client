import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e) => {
    try {
      let res = await AuthService.login(email, password);
      localStorage.setItem('user', JSON.stringify(res.data));
      setCurrentUser(AuthService.getCurrentUser());
      window.alert('登入成功，將導向到個人頁面');
      navigate('/profile');
    } catch (e) {
      setMessage(e.response.data);
    }
  };
  return (
    <div style={{ padding: '3rem' }} className='col-md-12'>
      <div>
        {message && <div className='alert alert-danger'>{message}</div>}
        <div className='form-group'>
          <label htmlFor='username'>電子信箱：</label>
          <input
            onChange={handleChangeEmail}
            type='text'
            className='form-control'
            name='email'
          />
        </div>
        <br />
        <div className='form-group'>
          <label htmlFor='password'>密碼：</label>
          <input
            onChange={handleChangePassword}
            type='password'
            className='form-control'
            name='password'
          />
        </div>
        <br />
        <div className='form-group'>
          <button className='btn btn-primary btn-block' onClick={handleLogin}>
            <span>登入系統</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
