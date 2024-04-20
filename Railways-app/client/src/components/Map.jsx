import React from 'react';
import PopupButton from './popup.jsx';
import map from '../images/map.png';
import './Map.css';

function Map() {
    return (
        <>
            <img src={map} className='map' />
        </>
    );
}

export default Map;