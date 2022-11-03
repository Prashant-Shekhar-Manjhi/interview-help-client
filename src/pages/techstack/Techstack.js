import React from 'react'
import Navbar from '../../components/navbar/Navbar';
// import { NavLink } from 'react-router-dom';
import "./techstack.css"

export default function Techstack() {
  return (
    <>
      <Navbar/>
      <div className="techstack-wrapper">
        <h1 className="main-heading">TechStack</h1>
        <div className="techstack-list">
          <p to={`/topics`}  className="teckstack-list-item">AI/ML</p>
          <p to={`/topics`}  className="teckstack-list-item">Cloud Computing</p>
          <p to={`/topics`}  className="teckstack-list-item">Web Programming</p>
        </div>
      </div>
    </>
  )
}
