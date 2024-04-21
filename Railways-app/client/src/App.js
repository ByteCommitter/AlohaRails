import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home.jsx';
import Station from './pages/stations.jsx';
import Navbar from './pages/Navbar.jsx';
import Schedule from './pages/schedule.jsx';
import AddTrainForm from './pages/addTrain.jsx';
import AddEmployeeForm from './pages/addEmp.jsx';
import AddScheduleForm from './pages/addSchedule.jsx';
import DeleteScheduleForm from './pages/deleteSchedule.jsx';
import GetSchedule from './pages/getSchedule.jsx'; // Import the GetSchedule component
import StationDetails from './pages/getStation.jsx'; // Import the StationDetails component
import DeleteEmployee from './pages/delEmp.jsx'; // Import the DeleteEmployee component

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/stations" element={<Station/>} />
                <Route path="/schedules" element={<Schedule/>} />
                <Route path="/addtrain" element={<AddTrainForm />} />
                <Route path="/addemployee" element={<AddEmployeeForm />} />
                <Route path="/addschedule" element={<AddScheduleForm />} />
                <Route path="/deleteschedule" element={<DeleteScheduleForm />} />
                <Route path="/getschedule" element={<GetSchedule />} /> {/* Add this line */}
                <Route path="/stationdetails" element={<StationDetails />} /> {/* Add this line */}
                <Route path="/deleteemployee" element={<DeleteEmployee />} /> {/* Add this line */}
            </Routes>
        </Router>
    );
}

export default App;