// import React from "react";
// import "./schedule.css";
// import { Link } from 'react-router-dom';
// import GetSchedule from "./getSchedule";

// function Schedule() {
//   return (

//     <div className="Schedule">
//       <div className='btn'>
//         <Link to="/addschedule">
//           <button >Add a Schedule</button>
//         </Link>
//         <Link to="/deleteschedule">
//           <button >Delete a Schedule</button>
//         </Link>
//       </div>
//       <h6>OR</h6>
//       <h4>LOOK UP A SCHEDULE</h4>
//       <div className="form">
//         <label>Enter the Train ID</label>
//         <input type="text" placeholder="Train ID" />
//         <button>Submit</button>
//       </div>
//     </div>

//   );
// }
// export default Schedule;

import React, { useState } from "react";
import "./schedule.css";
import { Link } from 'react-router-dom';
import GetSchedule from "./getSchedule";

function Schedule() {
  const [trainId, setTrainId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  }

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
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit">Search for a Schedule</button>
      </form>
      {submitted && <GetSchedule trainId={trainId} />}
    </div>
  );
}
export default Schedule;