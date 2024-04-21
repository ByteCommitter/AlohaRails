import React, { useState } from 'react';
import axios from 'axios';

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
        <form onSubmit={handleSubmit}>
            <label>
                Train ID:
                <input type="number" value={trainID} onChange={(e) => setTrainID(e.target.value)} required />
            </label>
            <button type="submit">Delete Schedule</button>
        </form>
    );
};

export default DeleteScheduleForm;