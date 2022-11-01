import React, {useEffect,useState} from 'react';
import "./topics.css";
import {useParams} from "react-router";
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import { NavLink } from 'react-router-dom';


export default function Topics() {
    const [topics, setTopics] = useState(null);
    const [course, setCourse] = useState(null);
    const param = useParams();
    const courseId = param.id;

    const fetchData = async(courseId)=>{
        const _topics = await axios.get(`http://localhost:8080/api/content/${courseId}`);
        // console.log(result.data.data.contents);
        setTopics(_topics.data.data.content)

        const _course = await axios.get(`http://localhost:8080/api/course/${courseId}`);
        // console.log(_course.data.data.courses);
        setCourse(_course.data.data.courses)
    }

    useEffect(()=>{
        fetchData(courseId);
    },[courseId]);
    console.log(topics);
    console.log(course);
  return (
     <>
        <Navbar/>
        {topics&&course&&<div className="course-wrapper">
            <h1 className='main-heading'>DSA</h1>
            <div className="course-topics">
                {topics.map((topic)=>{
                    return (<NavLink to={`/topics`}  className="course-topics-item">{topic.topic}</NavLink>)
                })}
                {/* <NavLink to={`/topics`}  className="course-topics-item">Array</NavLink>
                <NavLink to={`/topics`}  className="course-topics-item">Array</NavLink>
                <NavLink to={`/topics`}  className="course-topics-item">Array</NavLink>
                <NavLink to={`/topics`}  className="course-topics-item">Array</NavLink>
                <NavLink to={`/topics`}  className="course-topics-item">Array</NavLink>
                <NavLink to={`/topics`}  className="course-topics-item">Array</NavLink> */}
            </div>
            <div className="course-pdf-wrapper">
                <h2 className="sub-heading">Important PDFs</h2>
                <div className="course-pdf-list">
                    {course.pdfLink.map((link)=>{
                        return( <p className="course-pdf-list-item">{link}</p>);
                    })}
                    {/* <p className="course-pdf-list-item">pdf-1</p>
                    <p className="course-pdf-list-item">pdf-2</p>
                    <p className="course-pdf-list-item">pdf-3</p>
                    <p className="course-pdf-list-item">pdf-4</p>
                    <p className="course-pdf-list-item">pdf-5</p> */}
                </div>
            </div>
            <div className="course-suggestion-box"></div>
        </div>}
    </>
  )
}
