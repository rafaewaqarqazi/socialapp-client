import React, { useState } from "react";
import { forgotPassword } from "../../auth";

const ForgotPassword = props => {
    const [email, setEmail] = useState('');
    const [message,setMessage] = useState('');
    const [error,setError] = useState('');

    const forgotPasswordM = e => {
        e.preventDefault();
        setMessage('');
        setError('');
        forgotPassword(email).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
               setMessage(data.message);
            }
        });
    };

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Ask for Password Reset</h2>

            {message && (
                <h4 className="bg-success">{message}</h4>
            )}
            {error && (
                <h4 className="bg-warning">{error}</h4>
            )}

            <form>
                <div className="form-group mt-5">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Your email address"
                        value={email}
                        name="email"
                        onChange={e =>{
                            setEmail(e.target.value);
                            setMessage('');
                            setError('');
                            }}
                        autoFocus
                    />
                </div>
                <button
                    onClick={forgotPasswordM}
                    className="btn btn-raised btn-primary"
                >
                    Send Password Rest Link
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;