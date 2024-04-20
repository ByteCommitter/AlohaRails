import React, { useState } from 'react';
import axios from 'axios';
import './AddEmployeeForm.css'; // Import the CSS file

function AddEmployeeForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactDetails, setContactDetails] = useState('');
    const [shift, setShift] = useState('1');
    const [designation, setDesignation] = useState('Loco Pilot');
    const [stationId, setStationId] = useState('101');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const employee = {
            First_Name: firstName,
            Last_Name: lastName,
            Contact_Details: contactDetails,
            Shift: shift,
            Designation: designation,
            Station_ID: stationId
        };

        try {
            await axios.post('http://localhost:5000/addemployee', employee);
            setMessage('Added to database!');
        } catch (error) {
            setMessage('Could not add to database. The person may already be allocated a shift.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className="form-field">
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                <div className="form-field">
                    <label>Contact Details:</label>
                    <input type="text" value={contactDetails} onChange={e => setContactDetails(e.target.value)} />
                </div>
                <div className="form-field">
                    <label>Shift:</label>
                    <select value={shift} onChange={e => setShift(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div className="form-field">
                    <label>Designation:</label>
                    <select value={designation} onChange={e => setDesignation(e.target.value)}>
                        <option value="Loco Pilot">Loco Pilot</option>
                        <option value="Station Master">Station Master</option>
                        <option value="Ticket Collector">Ticket Collector</option>
                    </select>
                </div>
                <div className="form-field">
                    <label>Station ID:</label>
                    <select value={stationId} onChange={e => setStationId(e.target.value)}>
                        {[...Array(7)].map((_, i) => <option key={i} value={101 + i}>{101 + i}</option>)}
                    </select>
                </div>
                <input type="submit" value="Submit" />
            </form>
            {message && <div className="message">{message}</div>}
        </div>
    );
}

export default AddEmployeeForm;