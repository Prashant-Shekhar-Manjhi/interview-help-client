import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Resource from './pages/resourses/Resource';
import Experience from './pages/experience/Experience';
import Techstack from './pages/techstack/Techstack';
import Contact from './pages/contact/Contact';
import {
  BrowserRouter as Router,
  Route, Routes
} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/authContext/AuthContext';
import {Navigate} from "react-router-dom";
import SignUp from './pages/signup/SignUp';
import Topics from './pages/topics/Topics';

function App() {

  const {user} = useContext(AuthContext);
  return (
    <div className="App">
       <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>  
        <Route exact path="/signup" element={!user ? <SignUp/> : <Navigate to="/"/>}/>
        <Route exact path="/resource" element={<Resource/>}/>
        <Route exact path="/experience" element={<Experience/>}/>
        <Route exact path="/techstack" element={<Techstack/>}/>
        <Route exact path="/contact" element={<Contact/>}/>
        <Route exact path="/topics/:id" element={<Topics/>}/>
        {/* <Route exact path="/login" element={ logedInUser ? <Navigate to="/"/> : <Login/>}/> */}
      </Routes>
   </Router>
    </div>
  );
}

export default App;
