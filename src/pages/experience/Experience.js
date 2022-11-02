import React ,{useEffect, useState} from 'react'
import Navbar from '../../components/navbar/Navbar';
import { NavLink } from 'react-router-dom';
import "./experience.css";
import axios from 'axios';


export default function Experience() {
  const [companies, setCompanies] = useState(null);

  const fetchCompanies = async ()=>{
      try{const res = await axios.get('http://localhost:8080/api/company');
      setCompanies(res.data.companies);
    }catch(err){
        console.log(err);
      }
  }
  useEffect(()=>{
    fetchCompanies();
  },[])
  return (
    <div>
        <Navbar/>
        {companies&&<div className="experience-wrapper">
            <h1 className="main-heading">Experiences</h1>
            <div className="experience-company-list">
              {companies.map((company)=>{
                return (<NavLink to={`/company/${company?._id}`} key={company?._id} className="experience-company-list-item">{company?.name}</NavLink>)
              })}
              {/* <NavLink to={`/topics`}  className="experience-company-list-item">Target</NavLink> */}
              {/* <NavLink to={`/topics`}  className="experience-company-list-item">Target</NavLink>
              <NavLink to={`/topics`}  className="experience-company-list-item">Target</NavLink>
              <NavLink to={`/topics`}  className="experience-company-list-item">Target</NavLink>
              <NavLink to={`/topics`}  className="experience-company-list-item">Target</NavLink>
              <NavLink to={`/topics`}  className="experience-company-list-item">Target</NavLink> */}
            </div>
            <div className='experience-link-container'>
                <NavLink className="experience-link button">Add Your Experience &#8594;</NavLink>
            </div>
        </div>}
      
    </div>
  );
}
