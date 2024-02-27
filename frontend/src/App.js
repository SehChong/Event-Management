import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginForm } from './Pages/LoginForm';
import { Home } from './Pages/Home';
import { Club } from './Pages/Club';
import { ClubFormPage } from './Pages/ClubFormPage';
import { Event } from './Pages/Event';
import { EventFormPage } from './Pages/EventFormPage';
import { Profile } from './Pages/Profile';
import { Attendance } from './Pages/Attendance';
import { AccordionForm } from './Pages/AccordionForm';
import { EventList } from './Pages/EventList';

function App() {
  return (
    <BrowserRouter>
    {/* <ActivitiesCard totalPoints={95} timeLimit={1} /> */}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home /> } />
        <Route path="/Club" element={<Club />} />
        <Route path="/ClubForm" element={<ClubFormPage />} />
        <Route path="/event" element={<Event />} />
        <Route path="/eventForm" element={<EventFormPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/accordion-form" element={<AccordionForm />} />
        <Route path="/eventlist" element={<EventList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
