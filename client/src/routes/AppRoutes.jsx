import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
// import Register from '../pages/Register';
import Login from '../pages/Login';
import CreateEvent from '../pages/CreateEvent';
import EventList from '../pages/EventList';
import SignUp from '../pages/SignUp';
import EventDetails from '../pages/EventDetails';
// import NotFound from '../pages/NotFound'; 
// import UserRoute from '../components/protectedRoutes/UserRoute';

const AppRoutes = () => {
    return (
        <Routes>
            {/* <Route path='/products' element={<UserRoute><Home /></UserRoute>} /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/event-details" element={<EventDetails />} />
        </Routes>
    )
}

export default AppRoutes;