import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginForm } from './Pages/LoginForm';
import { Home } from './Pages/Home';
import { Proposal } from './Components/Proposal';

function App() {
  return (
    <Proposal/>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<LoginForm />} />
    //     <Route path="/home" element={<Home /> } />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
