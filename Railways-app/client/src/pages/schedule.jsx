import React from "react";
import "./schedule.css";
import { Link } from 'react-router-dom';


function Schedule() {
  return (

    <div className="Schedule">
      <div className='btn'>
        <Link to="/addschedule">
          <button >Add a Schedule</button>
        </Link>
        <Link to="/deleteschedule">
          <button >Delete a Schedule</button>
        </Link>
      </div>
      <h6>OR</h6>
      <h4>LOOK UP A SCHEDULE</h4>
      <div className="form">
        <label>Enter the Train ID</label>
        <input type="text" placeholder="Train ID" />
        <button>Submit</button>
      </div>
    </div>

  );
}
export default Schedule;