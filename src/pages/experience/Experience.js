import React ,{useContext, useEffect, useState} from 'react'
import Navbar from '../../components/navbar/Navbar';
import { useNavigate, NavLink } from 'react-router-dom';
import "./experience.css";
import axios from 'axios';
import { AuthContext } from '../../context/authContext/AuthContext';
// import { useRef } from 'react';


export default function Experience() {
  const [companies, setCompanies] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showCompanies, setShowCompanies] = useState(true);
  const [company_id, setCompany_id] = useState("");
  const navigate = useNavigate();
  const loggedInUser = useContext(AuthContext).user;
  const [name,setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role,setRole] = useState("");
  const [desc,setDesc] = useState("");


  const fetchCompanies = async ()=>{
      try{const res = await axios.get('http://localhost:8080/api/company');
      setCompanies(res.data.companies);
    }catch(err){
        console.log(err);
      }
  }

  const onClickHandler = ()=>{
    if(loggedInUser != null){
      setShowCompanies(false);
      setShowForm(true);
    }else{
      navigate("/login");
    }
  }

  const onSubmitHandler = async (e)=>{
      e.preventDefault();
      if(loggedInUser != null){
        let res = await axios(`http://localhost:8080/api/company/name/${companyName}`);
        // console.log(res.data.company);
        if(res.data.company.length === 0){
              res = await axios.post(`http://localhost:8080/api/company`,{
              name:companyName,
              description : ""
            });    
        }
        setCompany_id(res.data.data.company[0]._id);
        // console.log(res);
       if(company_id){ console.log(res);
        if(true){
          console.log(company_id)
         try{ await axios.post("http://localhost:8080/api/experience",{
            user_id:loggedInUser._id,
            name:name,
            company_id:company_id,
            role:role,
            description:desc
          });
          setShowCompanies(true);
          setShowForm(false);
        }catch(err){
          console.log(err);
          }
        }}
      }else{
        navigate("/login");
      }
  }
  useEffect(()=>{
    fetchCompanies();
  },[])
  return (
    <div>
        <Navbar/>
        {companies&&<div className="experience-wrapper">
           {showCompanies&& <>
           <h1 className="main-heading">Experiences</h1>
            <div className="experience-company-list">
              {companies.map((company)=>{
                return (<NavLink to={`/company/${company?._id}`} key={company?._id} className="experience-company-list-item">{company?.name}</NavLink>)
              })}
            </div>
            <div className='experience-link-container'>
                <p onClick={onClickHandler} className="experience-link button">Add Your Experience &#8594;</p>
            </div>
            </>}
            {showForm && <div className="add-experience-wrapper">
              <h2 className="sub-heading">Add Your experience</h2>
              <form onSubmit={onSubmitHandler} className="add-experience-form">
                <div className="add-experience-form-input">
                  <p className='add-experience-form-label'>Name</p>
                  <input type="text" className="add-experience-form-name" onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div className="add-experience-form-input">
                  <p className='add-experience-form-label'>Company</p>
                  <input type="text" className="add-experience-form-name" onChange={(e)=>{setCompanyName(e.target.value)}}/>
                </div>
                <div className="add-experience-form-input">
                  <p className='add-experience-form-label'>Role</p>
                  <input type="text" className="add-experience-form-name" onChange={(e)=>{setRole(e.target.value)}}/>
                </div>

                <div className="add-experience-form-input">
                  <p className='add-experience-form-label'>Description</p>
                  <textarea  rows="6" cols="30" onChange={(e)=>{setDesc(e.target.value)}}></textarea>
                </div>
                <div className="add-experience-form-button">
                  <button type="submit" >Submit</button>
                </div>
              </form>
            </div>}
        </div>}   
    </div>
  );
}
