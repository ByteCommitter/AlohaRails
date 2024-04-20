import React, { useState } from 'react';
import './StationBox.css'; // import your css file

function StationBox({ stationNumber }) {
  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <div className="box">
      <h2>Station {stationNumber}</h2>
      <button onClick={() => setDetailsVisible(!detailsVisible)}>
        {detailsVisible ? 'Hide Details' : 'Show Details'}
      </button>
      {detailsVisible && <p>Details about station {stationNumber}</p>}
    </div>
  );
}

export default StationBox;