import {Route,BrowserRouter,Routes} from 'react-router-dom'
import Admin from "./components/sidepage";
import Furniture from './components/furniturn';
import Home from './components/homepage';
import Feedbcak from './components/Feedback';
import OnlinePayment from './components/onlinepayment';
import Cash from './components/cashpayment';
import LoginForm from './components/adminlogin';
import RegistrationForm from './components/adminregister';
import Form from './components/Form';
import ForgotPassword from './components/ResetPassword';







function App() {
  return (

     <BrowserRouter>
    
        <Routes>
          {/* <Route path='/' element={<LoginForm/>}/> */}
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/reg" element={<RegistrationForm/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/furn" element={<Furniture/>}/>
          <Route path='/feed' element={<Feedbcak/>}/>
          <Route path='/pay' element={<OnlinePayment/>}/>
          <Route path='/Reset' element={<ForgotPassword/>}/>
          <Route path='/form' element={<Form/>} />
          <Route path='/cash' element={<Cash/>}/>
        
        </Routes>
     </BrowserRouter>
    
    
  );
}

export default App;
