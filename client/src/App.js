import logo from './logo.svg';
import './App.css';
import Registration from './components/Registration.js';
import Login from './components/Login.js';
import Mail from './components/Mail.js';
import Otp from './components/Otp.js';
import Resetpassword from './components/Resetpassword.js';
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
import Main from './components/Main.js';
import Teachermain from './components/Teachermain.js';
import Create_class from './components/Create_class.js';
import Class from './components/Class.js';

function App() {
  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/otp" element={<Otp/>} />
        <Route path="/mail" element={<Mail/>}/>
        <Route path="/resetpassword" element={<Resetpassword/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path='/teachermain' element={<Teachermain/>}/>
        <Route path='/createclass' element={<Create_class/>}/>
        <Route path='/class' element={<Class/>}/>
      </Routes>
    </Router>
    </div>
      
    
  );
}

export default App;
