import React,{useState} from 'react';
import Navbar from "./../../components/navbar/Navbar";
import "./Contact.css";
import axios from "axios";
import cancelIcon from "./../../assets/icons8-close-24.png"

export default function Contact() {
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);
  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    try{
      if(email !=="" && name !=="" && comment !=="")
      {await axios.post("http://localhost:8080/api/message",{
        name:name,
        email:email,
        comment:comment
      });
      setSent(true)
    }else{
        console.log("enter required fields!")
      }
    }catch(err){
      console.log(err);
    }
    setName("");
    setEmail('');
    setComment("");
  }
  return (
    <>
      <Navbar/>
      <div className="contact-page-container">
        <h2 className="sub-heading">Contact us</h2>
        <form  onSubmit={onSubmitHandler} className="contact-page-form">
          <div className="contact-form-input">
            <p className='contact-form-label'>Name</p>
            <input type="text" className="contact-form-name" onChange={(e)=>{setName(e.target.value)}} value={name}/>
          </div>
          <div className="contact-form-input">
            <p className='contact-form-label'>Email</p>
            <input type="email" className="contact-form-name" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
          </div>
          <div className="contact-form-input">
            <p className='contact-form-label'>Comment</p>
            <textarea  rows="6" cols="30" onChange={(e)=>{setComment(e.target.value)}} value={comment}></textarea>
          </div>
          <div className="contact-form-button">
            <button type="submit" >Submit</button>
          </div>
          {sent && <div className="sent-message-container">
            <p className="sent-message-text">sent</p>
            <img onClick={()=>{setSent(false)}} className="message-cancel-icon"src={cancelIcon} alt="Logo" />
          </div>}
        </form>
      </div>
    </>
  )
}
