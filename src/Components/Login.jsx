import { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [ email, setEmail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );

    const handleSubmit = ( e ) => {
        e.preventDefault();
        userLogin();
    };

    const userLogin = async () => {
        const payloads = { email, password };
        try {
            const response = await axios.post( 'https://password-reset-po28.onrender.com/user/login', payloads );
            if ( response.status === 200 ) {
                toast.success( response.data.message );
                setEmail( "" );
                setPassword( "" );
            }
        } catch ( error ) {
            if ( error.response ) {
                if ( error.response.status === 402 ) {
                    toast.error( "Incorrect password" );
                } else if ( error.response.data.message === "INVALID EMAIL" ) {
                    toast.error( "User not registered" );
                } else {
                    toast.error( "An unexpected error occurred" );
                }
            } else {

                toast.error( "Invalid Mail'id or Password" );
            }
        }
    };

    return (
        <div className="login-container">
            <form className="login" onSubmit={handleSubmit}>
                <h1>WELCOME BACK !</h1>
                <div className="icons d-flex gap-3 justify-content-center">
                    <a href=""><i className="bi bi-google"></i></a>
                    <a href=""><i className="bi bi-facebook"></i></a>
                    <a href=""><i className="bi bi-github"></i></a>
                    <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
                <div className="input-form d-flex flex-column">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={( e ) => setEmail( e.target.value )}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={( e ) => setPassword( e.target.value )}
                    />
                </div>
                <div className="btn-box d-flex flex-column">
                    <button type="submit" className="btn btn-warning">SIGN IN</button>
                    <span style={{ marginTop: "5px" }}>
                        Don&apos;t Have an Account?<NavLink to={'/register'}>Sign Up</NavLink>
                    </span>
                    <span style={{ marginTop: "5px" }}>
                        Forget Password?<NavLink to={'/pwreset'}>Change Password</NavLink>
                    </span>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
