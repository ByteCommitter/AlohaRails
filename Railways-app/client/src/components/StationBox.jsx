import React, { useState } from 'react';
import axios from 'axios';
import './StationBox.css'; // import your css file

function StationBox({ stationNumber }) {
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [station, setStation] = useState(null);

    const getStationDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/getstation/${stationNumber}`);
            setStation(response.data[0]);
        } catch (error) {
            console.error('Error fetching station details:', error);
            setStation(null);
        }
    };

    return (
        <div className="box">
            <h2>Station {stationNumber}</h2>
            <button onClick={() => {
                setDetailsVisible(!detailsVisible);
                if (!detailsVisible) {
                    getStationDetails();
                }
            }}>
                {detailsVisible ? 'Hide Details' : 'Show Details'}
            </button>
            {detailsVisible && station && (
                <ul>
                    {Object.entries(station).map(([key, value]) => (
                        <li key={key}>{key}: {value}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default StationBox;