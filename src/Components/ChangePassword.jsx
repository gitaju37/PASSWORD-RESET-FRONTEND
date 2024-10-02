import { useState } from "react";
import axios from 'axios';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  const [ newPassword, setNewPassword ] = useState( "" );
  const [ confirmPassword, setConfirmPassword ] = useState( "" );
  const [ pwdverifyString, setPwdVerifyString ] = useState( "" );


  const handleSubmit = async ( e ) => {
    e.preventDefault();
    await resetPassword();
  };

  const resetPassword = async () => {
    if ( newPassword !== confirmPassword ) {
      toast.error( "Passwords do not match." );
      return;
    }

    try {
      const payloads = { pwdverifyString, newPassword };
      const response = await axios.post( "https://password-reset-po28.onrender.com/user/changepassword", payloads );
      if ( response.status === 200 ) {
        toast.success( "Password reset successfully!" );
        setPwdVerifyString( "" );
        setNewPassword( "" );
        setConfirmPassword( "" );
      }
    } catch ( error ) {
      if ( error.response ) {
        if ( error.response.status === 404 ) {
          toast.error( "Link Expired" )
        } else if ( error.response.status === 401 ) {
          toast.error( "Invalid Verification Code" )
        } else {
          toast.error( "An unexpected error occurred" )
        }
      } else {
        toast.error( "Internal Server Error" )
      }
    }
  };

  return (
    <div className="pwd-container">
      <form className="change-pwd" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <h4>Enter Your New Password</h4>
        <div className="input-form d-flex flex-column">
          <input
            type="text"
            placeholder="Verification Code"
            value={pwdverifyString}
            onChange={( e ) => setPwdVerifyString( e.target.value )}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={( e ) => setNewPassword( e.target.value )}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={( e ) => setConfirmPassword( e.target.value )}
            required
          />
          <button type="submit" className="btn btn-warning">Reset Password</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
