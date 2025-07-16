import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { IconButton, InputAdornment, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSlug } from '../../SlugContext';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { setSlugs } = useSlug();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    fetch("http://localhost:3000/Examination/loginUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, role_id: role }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Authentication failed');
        }
      })
      .then((data) => {
        setIsLoading(false);
        
        if (data.code === 200) {
          // Store user data
          localStorage.setItem("token", data.status);
          localStorage.setItem("center_id", data.data.center_id);
          localStorage.setItem("name", data.data.name);
          localStorage.setItem("email", data.data.email);
          localStorage.setItem("user_id", data.data.id);
          localStorage.setItem("role_id", data.data.role_id);
          setSlugs(data.data.slugs);
          
          // Redirect based on role
          localStorage.setItem("userId", data.data.id)
          if(role === "1")
            localStorage.setItem("role", "Teacher")
          else if(role==="3")
            localStorage.setItem("role", "Examination")
          toast.success("Login Successful!")
          navigate("/Home");
        } else {
          toast.error("Login failed!")
          setError('Login failed. Please check your credentials.');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError('Invalid username or password!');
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <header className="header">
        <h1 className="dashboardHeading">~ Center Examify ~</h1>
      </header>
      
      <div className="loginFormContainer">
        <form className="loginForm" onSubmit={handleSubmit}>
          <h4>{role === 'student' ? 'Student Login' : 'Staff Login'}</h4>
          
          <div className="formGroup">
            <FormControl fullWidth variant="outlined" className="roleSelect">
              <InputLabel>Select Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Select Role"
              >
                <MenuItem value="1">Teacher</MenuItem>
                <MenuItem value="3">Examination</MenuItem>
              </Select>
            </FormControl>
          </div>
          
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <TextField
              type={showPassword ? 'text' : 'password'}
              id="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          
          {error && <div className="error">{error}</div>}
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
          
          <div className="forgotPassword">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;