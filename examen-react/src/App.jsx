// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateEvent from './components/CreateEvent';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Create" element={<CreateEvent />} />
                <Route path="/eventList" element={<EventList />} />
                <Route path="/eventDetails/:id" element={<EventDetails />} />
            </Routes>
        </Router>
    );
}

export default App;


