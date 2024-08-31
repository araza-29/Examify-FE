import React, { useState } from 'react';
import './login.scss';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const TestLogin = () => {
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
            email_id: username,
            password: password,
        };

        // Convert formData to a JSON string
        const formDataString = JSON.stringify(formData);

        // Store formDataString in local storage
        localStorage.setItem('formData', formDataString);

        // Send formData to the server using an HTTP request
        fetch('/api/admin/login', {
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
                console.log('Response from API', data);

                if (data.status === true) {
                    // Redirect to "home" page
                    localStorage.setItem("token", JSON.stringify(true));

                    // Storing adminData in localStorage
                    localStorage.setItem("userId", JSON.stringify(data.data.id));

                    // Storing adminData in localStorage
                    localStorage.setItem("adminData", JSON.stringify(data.data));

                    // Schedule the removal of "token" after one hour (3600000 milliseconds)
                    // setTimeout(() => {
                    //   localStorage.removeItem("token");
                    // }, 5000);

                    window.location.href = '/quizHome';
                } else {
                    // Set error message and clear username/password
                    setError('Invalid username or password!');
                    setUsername('');
                    setPassword('');
                }
            })
            .catch((error) => {
                console.log(error);
                // Handle error from the server
                // For example, you can display an error message to the user
                setError('An error occurred. Please try again.');
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login">
            <header className="header">
                <h1 className="dashboardHeading">~ Admission Test ~</h1>
            </header>
            <div className="loginFormContainer">
                <form className="loginForm" onSubmit={handleSubmit}>
                    <h4>Login</h4>
                    <div className="formGroup">
                        <label htmlFor="username">User Id</label>
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
        </div>
    );
};

export default TestLogin;
