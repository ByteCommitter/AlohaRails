import React, { useState } from 'react';
import axios from 'axios';

const GetSchedule = () => {
    const [trainID, setTrainID] = useState('');
    const [schedule, setSchedule] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`/getschedule?Train_ID=${Train_ID}`);
            setSchedule(response.data);
        } catch (error) {
            console.error('Error fetching schedule:', error);
        }
    };

    return (
        <div>
            <h1>Get Schedule</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Train ID:
                    <input type="text" value={trainID} onChange={e => setTrainID(e.target.value)} />
                </label>
                <button type="submit">Get Schedule</button>
            </form>
            {schedule && (
                <table>
                    <thead>
                        <tr>
                            {Object.keys(schedule[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((row, index) => (
                            <tr key={index}>
                                {Object.values(row).map((value, i) => (
                                    <td key={i}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default GetSchedule;