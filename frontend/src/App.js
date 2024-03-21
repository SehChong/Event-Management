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
import { Dashboard } from './Components/Dashboard';
import { EventValidation } from './Pages/Admin/EventValidation';
import { HomePage } from './Pages/Admin/HomePage';
import { ViewUser } from './Pages/Admin/ViewUser';
import { AccordionQuestion } from './Components/AccordionQuestion';
import { JoinedEvents } from './Pages/JoinedEvents';
import { ReportsReview } from './Pages/Admin/ReportsReview';

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
        <Route path="/adminHome" element={<HomePage />} />
        <Route path="/ManageUsers" element={<ViewUser />} />
        <Route path="/ManageEvent" element={<EventValidation />} />
        <Route path="/ManageReport" element={<ReportsReview />} />
        <Route path="/accordion-questions" element={<AccordionQuestion />} />
        <Route path="/registeredEvent" element={<JoinedEvents />} />
      </Routes>
    </BrowserRouter>
    // <ViewUser />
    // <EventValidation />
  );
}

export default App;
