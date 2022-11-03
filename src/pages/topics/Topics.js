import React, {useEffect,useState,useContext} from 'react';
import "./topics.css";
import {useParams} from "react-router";
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import { NavLink } from 'react-router-dom';
import Suggestion from '../../components/suggestion/Suggestion';
import { AuthContext } from '../../context/authContext/AuthContext';
// import { format, render, cancel, register } from 'timeago.js';


export default function Topics() {
    const [topics, setTopics] = useState(null);
    const [course, setCourse] = useState(null);
    const [messages, setMessages] = useState(null);
    const loggedInUser = useContext(AuthContext).user;
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

    const fetchMessages = async (courseId)=>{
        try{
            const res = await axios.get(`http://localhost:8080/api/suggestion/${courseId}`);
            setMessages(res.data.result)
        }catch(err){
            console.log(err);
        }   
    }


    useEffect(()=>{
        fetchData(courseId);
        fetchMessages(courseId);
    },[courseId]);

    // console.log(Math.random().toString());
  return (
     <>
        <Navbar />
        {course&&<div className="course-wrapper">
            <h1 className='main-heading'>{course?.name}</h1>
           {(topics.length!==0)&& <div className="course-topics">
                {topics.map((topic)=>{
                    return (<NavLink to={`/topics`} key={Math.random().toString()}  className="course-topics-item">{topic.topic}</NavLink>)
                })}
               
            </div>}
            <div className="course-pdf-wrapper">
                <h2 className="sub-heading">Important PDFs</h2>
                <div className="course-pdf-list">
                    {course.pdfLinks.map((pdfLink)=>{
                        return( <a href={pdfLink.link} target="_blank"  rel="noreferrer" key={Math.random().toString()} className="course-pdf-list-item">{pdfLink.pdf_name}</a>);
                    })}
                </div>
            </div>
            <div className="course-suggestion-box">
                <Suggestion user_id={loggedInUser?._id} course_id={course._id}/>
                <div className="course-suggestions">
                    {messages && messages.map( (message)=>{
                        // console.log(format(message.messages.createdAt));
                        return (
                            <div key={message._id} className="course-suggestion-item">
                                <p className="course-message">{message.messages?.text}</p>
                                <div className="course-suggestion-footer">
                                    <p className="message-sent-at">{message.createdAt?.toDateString()}</p>
                                    <p className="message-sent-by">{message.name}</p>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>
        </div>}
    </>
  )
}
