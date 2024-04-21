import React from 'react';
import './station.css';
import StationBox from '../components/StationBox';

function Station() {
  return (
    <>
      <div className="container">
        {[1, 2, 3, 4, 5, 6, 7].map(stationNumber => (
          <StationBox key={stationNumber} stationNumber={stationNumber} />
        ))}
      </div>
    </>
  );
}

export default Station;