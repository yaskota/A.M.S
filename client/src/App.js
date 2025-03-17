import logo from './logo.svg';
import './App.css';
import Registration from './components/Registration.js';
import Login from './components/Login.js';
import Mail from './components/Mail.js';
import Otp from './components/Otp.js';
import Resetpassword from './components/Resetpassword.js';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Main from './components/Main.js';

function App() {
  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/otp" element={<Otp/>} />
        <Route path="/mail" element={<Mail/>}/>
        <Route path="/resetpassword" element={<Resetpassword/>}/>
        <Route path="/main" element={<Main/>}/>

      </Routes>
    </Router>
    </div>
      
    
  );
}

export default App;
