import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Signup = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const resBody = await fetch("http://localhost:5000/signup", {
                method: "POST",
                mode: 'cors',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            if (!resBody.ok) {
                throw new Error('User is not Created!');
            }
            setUsername("");
            setPassword("");
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
                </div>
                <div className="col-md-4 col-sm-12">
                    <div className="card shadow">
                        <div className="card-body px-5">
                            <h4 className="card-title text-center mt-3 fw-bold">Sign Up</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input type="text" className="form-control input-bg p-2" id="text" placeholder='Username' value={username} onChange={handleUsernameChange} />
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control input-bg p-2" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                                </div>
                                <div className='d-grid mt-3'>
                                    <button type="submit" className="btn btn-primary">Sign Up</button>
                                </div>
                                <div className='my-4'>
                                    <hr className='text-muted' />
                                    <h5 className='text-muted text-center'>OR</h5>
                                    <hr className='text-muted' />
                                </div>
                                <div className='mt-3 mb-5 d-grid'>
                                    <span className='text-muted fs-6'>Already have an account?</span>
                                    <Link to="/login" className='ms-1 text-info fw-bold'>Log In</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
                </div>
            </div>
        </div>
    )
}

export default Signup;
