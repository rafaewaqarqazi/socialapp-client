import React, { useState } from "react";
import { resetPassword } from "../../auth";

const ResetPassword = props => {
    const [state, setState] = useState({
        newPassword: '',
        message: '',
        error: ''
    });

    const resetPasswordFunc = e => {
        e.preventDefault();
        setState({...state, message: "", error: "" });

        resetPassword({
            newPassword: state.newPassword,
            resetPasswordLink: props.match.params.resetPasswordToken
        }).then(data => {
            if (data.error) {
                console.log(data.error);
                setState({...state, error: data.error });
            } else {
                console.log(data.message);
                setState({...state, message: data.message, newPassword: "" });
            }
        });
    };

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Reset your Password</h2>

            {state.message && (
                <h4 className="bg-success">{state.message}</h4>
            )}
            {state.error && (
                <h4 className="bg-warning">{state.error}</h4>
            )}

            <form>
                <div className="form-group mt-5">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Your new password"
                        value={state.newPassword}
                        name="newPassword"
                        onChange={e =>
                            setState({
                                newPassword: e.target.value,
                                message: "",
                                error: ""
                            })
                        }
                        autoFocus
                    />
                </div>
                <button
                    onClick={resetPasswordFunc}
                    className="btn btn-raised btn-primary"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;