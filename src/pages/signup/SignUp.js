import React, {useContext, useRef} from 'react';
import axios from 'axios';
import './signup.css'
import { signup } from '../../context/authContext/AuthAction';
import { AuthContext } from '../../context/authContext/AuthContext';
import { NavLink } from 'react-router-dom';

export default function SignUp() {
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const {dispatch} = useContext(AuthContext);

    const onSubmitHandler = async (e)=>{
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:8080/api/users/signup", {name:name.current.value ,email:email.current.value, password:password.current.value, confirmPassword:confirmPassword.current.value});
            dispatch(signup(res.data.data.user));
            console.log(res.data.data.user);
          }catch(err){
            // dispatch(loginFailure());
          }
    }
  return (
    <div className="login-container">
    <div className="login-left-contaioner">
      <h1 className='login-left-heading'>Interview<span className="color">.help</span></h1>  
    </div>
    <div className="login-right-contaioner">
      <div className="form-wrapper">
      <form onSubmit={onSubmitHandler} className="signup-form center">
            <div className="signup-input-wrapper">
                <div className="signup-form-item">
                    <p className="form-item-title">Name </p>
                    <input type="text" name="name" ref={name}/>
                </div>
                <div className="signup-form-item">
                    <p className="signup-form-item-title">Email </p>
                    <input type="email" name="email" ref={email}/>
                </div>
                <div className="signup-form-item">
                    <p className="signup-form-item-title">Password </p>
                    <input type="password" name="password" ref={password}/>
                </div>
                <div className="signup-form-item">
                    <p className="signup-form-item-title">Confirm </p>
                    <input type="password" name="confirm password" ref={confirmPassword}/>
                </div>
            </div>
            <div className="signup-form-bottom-wrapper">
                <div className="signup-form-button">
                    <button type="submit">Sign up</button>
                </div>
                <div className="signup-form-button">
                    <NavLink to="/login" className="sign-up-button"type="button">Log in</NavLink>
                </div>
            </div>
        </form>
      </div>
    </div>
  </div>
  )
}
