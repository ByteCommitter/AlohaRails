import React, { useState } from 'react';
import axios from 'axios';

function DeleteEmployee() {
    const [contactDetails, setContactDetails] = useState('');

    const deleteEmployee = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/deleteemployee', {
                data: { Contact_Details: contactDetails }
            });
            alert(response.data);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                alert('No response received from the server.');
            } else {
                // Something happened in setting up the request that triggered an Error
                alert('Error', error.message);
            }
        }
    };

    return (
        <div>
            <input
                type="text"
                value={contactDetails}
                onChange={e => setContactDetails(e.target.value)}
                placeholder="Enter Contact Details"
            />
            <button onClick={deleteEmployee}>Delete Employee</button>
        </div>
    );
}

export default DeleteEmployee;