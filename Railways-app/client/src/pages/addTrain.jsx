import React, { useState } from 'react';
import axios from 'axios';
import './addTrain.css';


function AddTrainForm() {
  const [trainData, setTrainData] = useState({
    Train_ID: '',
    Name: '',
    Train_Status: '',
    Type: '',
    No_AC: '',
    No_NAC: ''
  });

  const handleChange = (e) => {
    setTrainData({
      ...trainData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/addtrain', trainData)
      .then(response => {
        alert(response.data);
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 400) {
            if (error.response.data.includes('Duplicate entry')) {
              alert('Train Number already in Use!');
            } else if (error.response.data.includes('capacity exceeded')) {
              alert('Train capacity exceeded!');
            } else {
              alert(error.response.data);
            }
          } else {
            alert('An error occurred while adding the train.');
          }
        } else if (error.request) {
          alert('No response received from server.');
        } else {
          alert('Error', error.message);
        }
      });
  };

  return (
    <>
      <div className='page'>
        <form onSubmit={handleSubmit}>

          <label className='sideheading'>
            Train ID
            <input type="text" name="Train_ID" onChange={handleChange} />
          </label>
          <br />
          <label className='sideheading'>
            Name
            <input type="text" name="Name" onChange={handleChange} />
          </label>
          <br />
          <label className='sideheading'>
            Train Status
            <input type="text" name="Train_Status" onChange={handleChange} />
          </label>
          <br />
          <label className='sideheading'>
            Type
            <select name="Type" onChange={handleChange}>
              <option value="">Select</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </select>
          </label>
          <br />
          <label className='sideheading'>
            No. of AC Coaches
            <select name="No_AC" onChange={handleChange}>
              {[...Array(21)].map((_, i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </label>
          <br />
          <label className='sideheading'>
            No. of Non-AC Coaches
            <select name="No_NAC" onChange={handleChange}>
              {[...Array(21)].map((_, i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}

export default AddTrainForm;