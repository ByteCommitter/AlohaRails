import React from 'react';
import { Link } from 'react-router-dom';
import './Managetrain.css';

function Managetrains() {
    return (
        <>
            <div className="trainmanager">
                <div>
                    <h1>What do u want to do?</h1>

                </div>
                <div className='btn'>
                    <Link to="/addtrain">
                        <button >Add a Train</button>
                    </Link>
                    <Link to="/deltrain">
                        <button >Delete a Train</button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Managetrains;