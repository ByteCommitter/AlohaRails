import React, { useState } from 'react';
import axios from 'axios';
import './deleteSchedule.css';

const DeleteScheduleForm = () => {
    const [trainID, setTrainID] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.delete('http://localhost:5000/deleteschedule', { data: { Train_ID: trainID } });
            alert(response.data);
        } catch (error) {
            alert(error.response.data);
        }
    };

    return (
        <div className="delsch">
            <form onSubmit={handleSubmit}>
                <label>
                    Train ID:
                    <input type="number" value={trainID} onChange={(e) => setTrainID(e.target.value)} required />
                </label>
                <button type="submit">Delete Schedule</button>
            </form>
        </div>
    );
};

export default DeleteScheduleForm;