import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginForm } from './Pages/LoginForm';
import { Home } from './Pages/Home';
import { Club } from './Pages/Club';
import { ClubForm } from './Components/ClubForm';
import { Event } from './Pages/Event';
import { EventForm } from './Components/EventForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home /> } />
        <Route path="/Club" element={<Club />} />
        <Route path="/ClubForm" element={<ClubForm />} />
        <Route path="/event" element={<Event />} />
        <Route path="/eventForm" element={<EventForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
