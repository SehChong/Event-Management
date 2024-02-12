import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginForm } from './Pages/LoginForm';
import { Home } from './Pages/Home';
import { Club } from './Components/Club';
import { ClubForm } from './Components/ClubForm';
import { Event } from './Components/Event';
import { EventProposal } from './Components/EventProposal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home /> } />
        <Route path="/Club" element={<Club />} />
        <Route path="/ClubForm" element={<ClubForm />} />
        <Route path="/event" element={<Event />} />
        <Route path="/eventForm" element={<EventProposal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
