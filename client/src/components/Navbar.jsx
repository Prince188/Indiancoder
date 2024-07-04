import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useAuth } from '../store/auth';
import { NavLink } from 'react-router-dom';
import { IoBookOutline, IoCallOutline, IoHomeOutline, IoInformationCircleOutline, IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { SlMenu } from "react-icons/sl";

export const Navbar = () => {
    const { isLoggedIn, user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleMenu2=() =>{
        if(window.innerWidth > 480){
            setIsMenuOpen(true)
        }
        else{
            setIsMenuOpen(false);
        }
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 480) {
                setIsMenuOpen(true); // Open menu on desktop
            } else {
                setIsMenuOpen(false); // Close menu on mobile
            }
        };

        handleResize(); // Set initial state based on current screen size

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const header = document.querySelector('header');
        const li = document.querySelector('li');
        const icons = document.querySelectorAll('.icon');
        if (isMenuOpen) {
            header.style.width = '200px'
            icons.forEach(icon => icon.style.display = 'inline-block');
        } else {
            header.style.width = '36px'
            icons.forEach(icon => icon.style.display = 'none');
        }
    }, [isMenuOpen]);


    return (
        <header>
            <div className="container">
                <div className="logo-brand">
                    <div className="logo"><NavLink to="/">Indian Coder</NavLink></div>
                    <li className="menu" onClick={toggleMenu}><SlMenu size={18} /></li>
                </div>
                <nav>
                    <ul>
                        {isLoggedIn ?
                            (<>
                                <li onClick={toggleMenu2}><NavLink to="/"> <IoHomeOutline size={18} /> <span className='icon'>Home</span></NavLink></li>
                                <li onClick={toggleMenu2}><NavLink to="/about"> <IoInformationCircleOutline size={18} /> <span className="icon">About</span></NavLink></li>
                                <li onClick={toggleMenu2}><NavLink to="/service"> <IoBookOutline size={18} /><span className="icon">Courses</span></NavLink></li>
                                <li onClick={toggleMenu2}><NavLink to="/contact"><IoCallOutline size={18} /><span className="icon">Contact</span></NavLink></li>
                                <li onClick={toggleMenu2}><NavLink to="/logout"><IoLogOutOutline size={18} /><span className="icon">Logout</span></NavLink></li>
                            </>)
                            : (<>
                                {/* <li><NavLink to="/register">Register</NavLink></li> */}
                                <li><NavLink to="/login"><IoLogInOutline size={18} /><span className="icon">Login</span></NavLink></li>
                            </>)
                        }
                        {user.isAdmin ? (
                            <>
                                {/* <li><NavLink to="/profile">Profile</NavLink></li> */}
                                <li><NavLink to="/admin"><MdOutlineAdminPanelSettings size={18} /><span className="icon">Admin</span></NavLink></li>
                            </>
                        ) : ("")}
                    </ul>
                </nav>
            </div>
        </header>
    );
};
