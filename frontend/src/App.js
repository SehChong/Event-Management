import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginForm } from './Pages/LoginForm';
import { Home } from './Pages/Home';
import { Proposal } from './Components/ClubProposal';
import { ClubForm } from './Components/ClubForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home /> } />
        <Route path="/proposal" element={<Proposal />} />
        <Route path="/form" element={<ClubForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
