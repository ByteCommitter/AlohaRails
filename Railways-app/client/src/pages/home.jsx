import React from 'react';
import './home.css';
import Modal from 'react-modal';
import PopupButton from '../components/popup';
import map from '../images/map.png';

function Home() {
  return (
    <>
      <div>
        <h1 className='welcome'>
          |   Welcome to Aloha Railways   |
        </h1>
      </div>
      <br />


      <div className='map-container'>
        <img src={map} className='map' />
      </div>
    </>
  );
}

export default Home;