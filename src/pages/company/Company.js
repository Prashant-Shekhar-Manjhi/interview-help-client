import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar';
import "./company.css";
import axios from 'axios';
import { useParams } from 'react-router';
export default function Company() {
    const [company, setCompany] = useState(null);
    const [experiences, setExperiences] = useState(null);
    const param = useParams();
    const company_id = param.id;
    const fetchCompany = async (id)=>{
        try{
            const res = await axios.get(`http://localhost:8080/api/company/id/${id}`);
            // console.log(res.data.company);
            setCompany(res.data.company);
        }catch(err){
            console.log(err)
        }
       
    }

    const fetchExperiences = async (id)=>{
        try{
            const res = await axios.get(`http://localhost:8080/api/experience/${id}`);
            // console.log(res.data.data.experiences);
            setExperiences(res.data.data.experiences)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchCompany(company_id);
        fetchExperiences(company_id);
    },[company_id]);
  return (
    <>
        <Navbar/>
        {company && <div className="company-wrapper">
            <h1 className="main-heading">{company?.name}</h1>
            {company?.description===""&&<div className="about-company">
                <p className="about-company-text">{company?.description}</p>
            </div>}
            {experiences&&experiences.map((exp)=>{
                return <div key={exp._id}className="company-experience-list">
                            <p className="company-experience-list-text">
                                {exp?.description}
                            </p>
                        </div>
            })}
        </div>}
    </>
  )
}
