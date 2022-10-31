import React, {useContext, useRef} from 'react'
import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from '../../context/authContext/AuthAction';
import "./login.css"
import { AuthContext } from '../../context/authContext/AuthContext';
import { NavLink } from 'react-router-dom';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const {dispatch}  = useContext(AuthContext);

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    dispatch(loginStart());
    try{
      const res = await axios.post("http://localhost:8080/api/users/login", {email:email.current.value, password:password.current.value});
      dispatch(loginSuccess(res.data.data.user));
    }catch(err){
      dispatch(loginFailure());
    }

  }

  return (
    <div className="login-container">
      <div className="login-left-contaioner">
        <h1 className='login-left-heading'>Interview<span className="color">.help</span></h1>  
      </div>
      <div className="login-right-contaioner">
        <div className="form-wrapper">
          <form onSubmit={onSubmitHandler} className="login-form center">
            <div className="login-input-wrapper">
                <div className="login-form-item">
                    <p className="form-item-title">Email </p>
                    <input type="email" name="email" ref = {email}/>
                </div>
                <div className="login-form-item">
                    <p className="form-item-title">Password </p>
                    <input type="password" name="password"  ref={password}/>
                </div>
            </div>
            <div className="login-form-bottom-wrapper">
                <div className="login-form-button">
                    <button type="submit" >Log in</button>
                </div>
                <p className="forget-password">Forget password?</p>
                <div className="login-form-button">
                    <NavLink to="/signup" className="sign-up-button"type="button">Sign up</NavLink>
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
