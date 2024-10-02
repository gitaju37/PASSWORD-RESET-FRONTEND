import { useState } from "react"
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"



const ForgetPassword = () => {
  const [ email, setEmail ] = useState( "" )


  const handleSubmit = ( e ) => {
    e.preventDefault()
    forgotPassword()
  }
  const forgotPassword = async () => {
    try {
      const response = await axios.post( "http://localhost:4000/user/fgpassword", { email } )
      console.log( email )
      if ( response.status === 200 ) {
        toast.success( response.data.message );
        setEmail( "" )
      }
    } catch ( error ) {
      if ( error.response ) {
        if ( error.response.status == 404 ) {
          toast.error( error.response.data.message )
        }
      } else {
        toast.error( "Internal Server Error" );
      }

    }

  }
  return (
    <div className="fg-container">
      <div className="fg-body d-flex flex-column" style={{ marginTop: "150px" }}>
        <form onSubmit={handleSubmit}>
          <h3>Please Enter Your Email Address</h3>
          <div className="fg-input d-flex flex-column">
            <input type="email"
              placeholder="Email"
              value={email}
              onChange={( e ) => { setEmail( e.target.value ) }} />
            <button type="submit" className="btn btn-warning" >Change Password</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ForgetPassword
