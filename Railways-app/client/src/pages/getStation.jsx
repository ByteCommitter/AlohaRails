import React, { useState } from 'react';
import axios from 'axios';

function StationDetails() {
    const [stationId, setStationId] = useState('');
    const [station, setStation] = useState(null);

    const getStationDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/getstation/${stationId}`);
            setStation(response.data[0]);
        } catch (error) {
            console.error('Error fetching station details:', error);
            setStation(null);
        }
    };

    return (
        <div>
            <h1>Station Details</h1>
            <label>
                Station ID:
                <input type="number" value={stationId} onChange={e => setStationId(e.target.value)} />
            </label>
            <button onClick={getStationDetails}>Get Station Details</button>
            {station && (
                <ul>
                    {Object.entries(station).map(([key, value]) => (
                        <li key={key}>{key}: {value}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default StationDetails;