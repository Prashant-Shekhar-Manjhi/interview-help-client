import React, {useState} from 'react';
import axios from 'axios';
import "./suggestion.css"

export default function Suggestion(props) {
    const [suggestion, setSuggestion] = useState("");
    const onSubmitHandler = async (e)=>{
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:8080/api/suggestion", {text:suggestion, user_id:props.user_id, course_id: props.course_id});
            console.log(res.data.message);
            setSuggestion("");
        }catch(err){
            console.log(err);
        }
    }

    const onChangeHandler = (e)=>{
        setSuggestion(e.target.value);  
    }
    console.log(suggestion);
  return (
    <div className='suggestion-form-wrapper'>
        <h1 className="suggestion-main-heading">Suggestion Box :</h1>
        <form onSubmit={onSubmitHandler} className="suggestion-form">
            <textarea onChange={onChangeHandler} rows="6" cols="50" value={suggestion} placeholder='Write any Suggestion...'></textarea>
            <button type='submit' className='button' >Submit</button>
        </form>
    </div>
  )
}
