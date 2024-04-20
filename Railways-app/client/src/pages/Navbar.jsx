import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Aloha Railways</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home </Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/stations">Stations </Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/schedules">Schedules </Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/addtrain"> Add Train </Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/addemployee"> Add Employee </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;