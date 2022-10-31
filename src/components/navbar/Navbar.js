import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext/AuthContext'
import { logout } from '../../context/authContext/AuthAction';
import './navbar.css'
import { NavLink } from 'react-router-dom';
import profileLogo from './../../assets/profile.png';
export default function Navbar() {
    const {user, dispatch} = useContext(AuthContext);
    const [menuVisible, setMenuvisible] = useState(false);
    const logOutHandler = ()=>{
        dispatch(logout());
        setMenuvisible(false);
    }

    const profileClickHandler = ()=>{
        if(menuVisible){
            setMenuvisible(false);
        }else{
            setMenuvisible(true);
        }   
    }
    
    return (
        <>
         <div className="navbar-wrapper">
            <div className="navbar">
                <div className="navbar-logo">
                    <h1>Interview<span className="color">.help</span></h1>
                </div>
                <div className="navbar-links">
                    <p className="navbar-link">Home</p>
                    <p className="navbar-link">Resources</p>
                    <p className="navbar-link">Experiences</p>
                    <p className="navbar-link">Techstack</p>
                    <p className="navbar-link">Contact</p>
                    {!user && <NavLink to="/login" className="navbar-link button">Log in</NavLink>}
                    {user && <img onClick={profileClickHandler}className="navbar-profile-logo"src={profileLogo} alt="Logo" />}
                </div>
            </div>     
        </div>
        {menuVisible &&<div className="navbar-menu-container">
            <ul className="navbar-menu">
                <li className="navbar-menu-item">Profile</li>
                <li  onClick={logOutHandler} className="navbar-menu-item">Log out</li>
            </ul>
        </div>}
        </>
    )
}
