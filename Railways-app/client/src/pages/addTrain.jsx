import React, { useState } from 'react';

function AddTrainForm() {
  const [trainId, setTrainId] = useState('');
  const [trainName, setTrainName] = useState('');
  const [trainStatus, setTrainStatus] = useState('');
  const [trainType, setTrainType] = useState('');
  const [trainCoaches, setTrainCoaches] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const response = await fetch('http://localhost:5000/addtrain', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Train_ID: trainId,
            Name: trainName,
            Train_Status: trainStatus,
            Type: trainType,
        }),
    });
  
    const data = await response.text();
  
    if (response.ok) {
      alert('Train added successfully!');
    } else {
      alert(data);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <label>
        Train ID:
        <input type="text" value={trainId} onChange={(e) => setTrainId(e.target.value)} required />
      </label>
      <label>
        Train Name:
        <input type="text" value={trainName} onChange={(e) => setTrainName(e.target.value)} required />
      </label>
      <label>
        Train Status:
        <input type="text" value={trainStatus} onChange={(e) => setTrainStatus(e.target.value)} required />
      </label>
      <label>
        Train Type:
        <select value={trainType} onChange={(e) => setTrainType(e.target.value)} required>
          <option value="electrical">Electrical</option>
          <option value="diesel">Diesel</option>
        </select>
      </label>
      <label>
        Train Coaches:
        <select value={trainCoaches} onChange={(e) => setTrainCoaches(e.target.value)} required>
          <option value="A/C">A/C</option>
          <option value="Non A/C">Non A/C</option>
        </select>
      </label>
      <button type="submit">Add Train</button>
    </form>
  );
}

export default AddTrainForm;