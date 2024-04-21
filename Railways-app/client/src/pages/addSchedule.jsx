import React, { useState } from 'react';
import axios from 'axios';

function AddScheduleForm() {
  const [scheduleData, setScheduleData] = useState({
    Departure_Time: '',
    Arrival_Time: '',
    Train_ID: '',
    Route: '',
    From_station_ID: '',
    To_station_ID: ''
  });

  const handleChange = (e) => {
    setScheduleData({
      ...scheduleData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/addschedule', scheduleData)
      .then(response => {
        alert(response.data);
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 400) {
            if (error.response.data.includes('Duplicate entry')) {
              alert('Schedule already exists!');
            } else {
              alert(error.response.data);
            }
          } else {
            alert('An error occurred while adding the schedule.');
          }
        } else if (error.request) {
          alert('No response received from server.');
        } else {
          alert('Error', error.message);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Departure Time:
        <input type="time" name="Departure_Time" onChange={handleChange} required />
      </label>
      <label>
        Arrival Time:
        <input type="time" name="Arrival_Time" onChange={handleChange} required />
      </label>
      <label>
        Train ID:
        <input type="number" name="Train_ID" onChange={handleChange} required />
      </label>
      <label>
        Route:
        <input type="text" name="Route" onChange={handleChange} required />
      </label>
      <label>
        From Station ID:
        <input type="number" name="From_station_ID" onChange={handleChange} required />
      </label>
      <label>
        To Station ID:
        <input type="number" name="To_station_ID" onChange={handleChange} required />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default AddScheduleForm;