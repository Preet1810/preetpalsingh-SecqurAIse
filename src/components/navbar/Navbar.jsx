
import React from 'react';
import './Navbar.css';
import { AiOutlineSearch } from 'react-icons/ai';
function Navbar({ male, female }) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/">SECQUR<span>AI</span>SE</a>
            </div>
            <div className="navbar-right">
                <AiOutlineSearch className='search' />
                <button className='male'>{male}</button>
                <button className='female'>{female}</button>
            </div>
        </nav>
    );
}

export default Navbar;

