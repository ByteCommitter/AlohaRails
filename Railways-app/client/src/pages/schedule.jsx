import React from "react";
import "./schedule.css";

function Schedule() {
  return (
    
      <div className="Schedule">

        <h1>SCHEDULES</h1>

        <div className="form">
            <label>Train Name</label>
        <input type="text" placeholder="Train Name" />
            <label>Time</label>
        <input type="text" placeholder="Time" />
        <button>Submit</button>
        </div>

      </div>
    
  );
}
export default Schedule;