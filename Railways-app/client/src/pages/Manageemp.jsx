import React from 'react';
import { Link } from 'react-router-dom';
import './Manageemp.css';

function Manageemp() {
    return (
        <>
            <div className="empmanager">
                <div>
                    <h1>What do u want to do?</h1>

                </div>
                <div className='btn'>
                    <Link to="/addemployee">
                        <button >Add Employee</button>
                    </Link>
                    <Link to="/delemployee">
                        <button >Delete Employee</button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Manageemp;