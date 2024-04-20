import React, { useState } from 'react';
import Modal from 'react-modal';
import './popup.css';

function PopupButton() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
    
    <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
    
    <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
      <h2>Station Details</h2>
      <p>Details</p>
      <button onClick={() => setModalIsOpen(false)}>Close</button>
    </Modal>
  
    </>
  );
}

export default PopupButton;