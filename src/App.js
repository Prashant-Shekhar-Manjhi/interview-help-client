import Home from './pages/home/Home';
import Login from './pages/login/Login';
import {
  BrowserRouter as Router,
  Route, Routes
} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/authContext/AuthContext';
import {Navigate} from "react-router-dom";
import SignUp from './pages/signup/SignUp';

function App() {

  const {user} = useContext(AuthContext);
  return (
    <div className="App">
       <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>  
        <Route exact path="/signup" element={!user ? <SignUp/> : <Navigate to="/"/>}/>
        {/* <Route exact path="/login" element={ logedInUser ? <Navigate to="/"/> : <Login/>}/> */}
      </Routes>
   </Router>
    </div>
  );
}

export default App;
