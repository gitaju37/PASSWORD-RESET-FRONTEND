import { useState } from "react"
import "./Register.css"
import axios from "axios"
import { NavLink } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [ userName, setUserName ] = useState( "" )
    const [ password, setPassword ] = useState( "" )
    const [ email, setEmail ] = useState( "" )


    const handleSubmit = ( e ) => {
        e.preventDefault()
        userRegister()
    }
    const userRegister = async () => {
        const payloads = { userName, email, password }
        try {
            const response = await axios.post( "http://localhost:4000/user/register", payloads );
            if ( response.status === 201 ) {
                toast.success( response.data.message );
                setUserName( "" )
                setEmail( "" )
                setPassword( "" )
            }

        } catch ( error ) {
            if ( error.response ) {
                if ( error.response.status === 400 ) {
                    toast.error( error.response.data.message );
                }
            } else {
                toast.error( "Internal Server Error" );
            }
        }


    }

    return (
        <div className="register-container">
            <form className="register" onSubmit={handleSubmit}>
                <h1>Create a Account</h1>
                <div className="icons d-flex gap-3 justify-content-center">
                    <a href=""><i className="bi bi-google"></i></a>
                    <a href=""><i className="bi bi-facebook"></i></a>
                    <a href=""><i className="bi bi-github"></i></a>
                    <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
                <div className="input-form d-flex flex-column ">
                    <input type="text"
                        placeholder="UserName"
                        value={userName}
                        onChange={( e ) => setUserName( e.target.value )} />
                    <input type="email"
                        placeholder="Email"
                        value={email}
                        onChange={( e ) => setEmail( e.target.value )} />
                    <input type="password"
                        placeholder="Password"
                        value={password}
                        onChange={( e ) => setPassword( e.target.value )} />
                </div>
                <div className="btn-box d-flex flex-column">
                    <button type="submit" className="btn btn-warning">SIGN UP</button>
                    <span style={{ marginTop: "5px" }}>Already Have an Account?<NavLink to={'/'}>Sign In</NavLink></span>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Register
