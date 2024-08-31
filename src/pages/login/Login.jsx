import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './login.scss';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { data } from 'jquery';
import { useSlug } from '../../SlugContext';

const Login = () => {
  const navigate = useNavigate();
  const { setSlugs } = useSlug()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email: username,
      password: password,
    };

    // // Convert formData to a JSON string
    const formDataString = JSON.stringify(formData);


    // Send formData to the server using an HTTP request
    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formDataString,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
      .then((data) => {

        const admindata = data.data;
        console.log(admindata);
        if (data.status == 'true') {
          localStorage.setItem("token",data.status);
          console.log('andar hai')
          localStorage.setItem("center_id",admindata.center_id);
          localStorage.setItem("name",admindata.name);
          localStorage.setItem("email",admindata.email);
          localStorage.setItem("user_id",admindata.id);
          localStorage.setItem("role_id",admindata.role_id);
          setSlugs(admindata.slugs);
          const admindataString = JSON.stringify(admindata);

          localStorage.setItem("admindata", admindataString);

          navigate('/home');

        }

     
      })
      .catch((error) => {
        console.log(error)
        setError('Invalid username or password!');
        setUsername('');
        setPassword('');
      }
      );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <header className="header">
        <h1 className="dashboardHeading">~ Quiz Dashboard ~</h1>
      </header>
      <div className="loginFormContainer">
        <form className="loginForm" onSubmit={handleSubmit}>
          <h4>Login</h4>
          <div className="formGroup">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <TextField
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit">Log In</button>
        </form>
      </div>
      <footer className="footer">
        <Link to="/quizLogin" style={{ textDecoration: "none" }}>
              Do you want to login as a student?
        </Link>
      </footer>
    </div>
  );
};

export default Login;
