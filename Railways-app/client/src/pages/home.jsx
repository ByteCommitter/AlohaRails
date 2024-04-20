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
      <br />
      <div className="about">
        <h2>About us</h2>
        <p>
          Aloha Railways is a railway company that provides services to the Aloha Islands. We offer a variety of services including passenger and freight transportation. Our goal is to provide a safe, reliable, and efficient transportation system for the people of Aloha.Our Railway Management System streamlines the Aloha island's network of 7 interconnected stations. It manages the scheduling of trains across various routes, ensuring efficient and timely connections. The system optimizes the work of various railway employees, including Locomotive-Engineer, Ticket Collectors, Station managers. Employee shifts are carefully tracked to ensure compliance with regulations and maintain smooth operations across the network. The system allows the administration to easily add trains, coaches and even new routes. This centralized system enables real-time data on train positions, schedules, and staff availability, improving efficiency and providing a better experience for the railway administration.
        </p>
      </div>
    </>
  );
}

export default Home;