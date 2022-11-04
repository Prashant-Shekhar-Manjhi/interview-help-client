import React ,{useContext, useEffect, useState} from 'react'
import Navbar from '../../components/navbar/Navbar';
import { useNavigate, NavLink } from 'react-router-dom';
import "./experience.css";
import axios from 'axios';
import { AuthContext } from '../../context/authContext/AuthContext';



export default function Experience() {
  const [companies, setCompanies] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showCompanies, setShowCompanies] = useState(true);
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
    if(name && companyName && role && desc){
      try{
        const res = await axios.post("http://localhost:8080/api/experience",{
          user_id:loggedInUser._id,
          name:name,
          company:companyName,
          role:role,
          description:desc
        });
        alert(res.data.message);
        setShowForm(false);
        setShowCompanies(true);
      }catch(err){
        console.log(err);
      }
    }else{
      alert("Please fill the required fields!")
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
                  <button type="button" onClick={()=>{setShowForm(false);  setShowCompanies(true);}} >Cancel</button>
                </div>
              </form>
            </div>}
        </div>}   
    </div>
  );
}
