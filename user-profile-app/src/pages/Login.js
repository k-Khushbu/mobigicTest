import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                console.log('Login successful');
                setLoggedIn(true);
                navigate('/uploadfile');
            } else {
                console.error('Login failed');
            }
            setUsername("");
            setPassword("");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
                    
                </div>
                <div className="col-md-4 col-sm-12">
                    <div className="card shadow">
                        <div className="card-body px-5">
                            <h4 className="card-title text-center mt-3 fw-bold">Log In</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input type="text" className="form-control input-bg p-2" id="username" placeholder='Username' value={username} onChange={handleUsernameChange} />
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control input-bg p-2" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                                </div>
                                <div className='d-grid mt-3'>
                                    <button type="submit" className="btn btn-primary">Log In</button>
                                </div>
                                <div className='my-4'>
                                    <hr className='text-muted' />
                                    <h5 className='text-muted text-center'>OR</h5>
                                    <hr className='text-muted' />
                                </div>
                                <div className='mt-3 mb-5 d-grid'>
                                    <span className='text-muted fs-6'>Don't have an account?</span>
                                    <Link to="/signup" className='ms-1 text-info fw-bold'>Sign Up</Link>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
                    
                </div>
            </div>
        </div>
    );
}

export default Login;
