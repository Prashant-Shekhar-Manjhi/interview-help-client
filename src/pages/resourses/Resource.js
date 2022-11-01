import React, {useEffect, useState} from 'react'
import Navbar from '../../components/navbar/Navbar';
import { NavLink } from 'react-router-dom';
import "./resource.css";
import axios from 'axios';

export default function Resource() {

  const [courses, setCourses] = useState(null);
  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async ()=>{
    const data = await axios.get("http://localhost:8080/api/course/");
    setCourses(data.data.data.courses)
  }
  return (
    <div>
    <Navbar/>
    <div className="resource-wrapper">
        {courses && courses.map((course)=>{
            return <NavLink to={`/topics/${course._id}`} key={course._id} className="resource-item">{course.name}</NavLink>
        })}
     </div>
 </div>
  )
}
