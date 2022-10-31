import React from 'react'
import './home.css'
import Navbar from '../../components/navbar/Navbar'

export default function Home() {
  return (
    <div>
       <Navbar/>
       <div className="home-content-wrapper">
            <div className="home-content">
                <h1 className="home-heading">Interview<span class="color">.help</span></h1>
                <p className="home-desc">
                    A web application which allows students to access all resources to prepare for interviews and online tests.
                </p>
            </div>
        </div>
    </div>
  )
}
