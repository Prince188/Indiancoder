import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useAuth } from '../store/auth';
import { NavLink } from 'react-router-dom';
import { IoBookOutline, IoCallOutline, IoHomeOutline, IoInformationCircleOutline, IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { SlMenu } from "react-icons/sl";
import { TiThMenu } from "react-icons/ti";


export const Navbar = () => {
    const { isLoggedIn, user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);


    return (
        <>
            {/* <div className="ads" style={{margin : 'auto'}}>
                Free Courses Available. <NavLink>Get it Now &rarr;</NavLink>
            </div> */}
            <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="container">
                    <div className="nav-cont" style={{ display: 'flex', gap: '50px' }}>
                        <div className="logo-brand">
                            <div className="logo"><NavLink to="/">Indian Coder</NavLink></div>
                            <li className="menu"><SlMenu size={18} /></li>
                        </div>
                        <nav className='nav-routes'>
                            <ul>
                                {isLoggedIn ?
                                    (<>
                                        <li><NavLink to="/"> <IoHomeOutline size={18} /> <span className='icon'>Home</span></NavLink></li>
                                        <li><NavLink to="/about"> <IoInformationCircleOutline size={18} /> <span className="icon">About</span></NavLink></li>
                                        <li><NavLink to="/service"> <IoBookOutline size={18} /><span className="icon">Courses</span></NavLink></li>
                                        <li><NavLink to="/contact"><IoCallOutline size={18} /><span className="icon">Contact</span></NavLink></li>
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
                    <div className="nav-cont" style={{ display: 'flex', gap: '50px' }}>
                        <nav style={{ display: 'flex', alignItems: 'center' }}>
                            {
                                isLoggedIn ?
                                    (
                                        <ul>
                                            <li id='logout'><NavLink to="/logout"><IoLogOutOutline size={18} /><span className="icon">Logout</span></NavLink></li>
                                        </ul>
                                    ) :
                                    ("")
                            }
                            <div className='menu-dropdown-btn' onClick={()=>setIsMenuOpen(!isMenuOpen)}><TiThMenu size={24} /></div>
                        </nav>
                    </div>
                </div>
            </header>
            {
                isMenuOpen ? (
                    <div className='mobile-header'>
                        <nav className='nav-route'>
                            <ul>
                                {isLoggedIn ?
                                    (<>
                                        <li onClick={()=>setIsMenuOpen(false)}><NavLink to="/"> <IoHomeOutline size={18} /> <span className='icon'>Home</span></NavLink></li>
                                        <li onClick={()=>setIsMenuOpen(false)}><NavLink to="/about"> <IoInformationCircleOutline size={18} /> <span className="icon">About</span></NavLink></li>
                                        <li onClick={()=>setIsMenuOpen(false)}><NavLink to="/service"> <IoBookOutline size={18} /><span className="icon">Courses</span></NavLink></li>
                                        <li onClick={()=>setIsMenuOpen(false)}><NavLink to="/contact"><IoCallOutline size={18} /><span className="icon">Contact</span></NavLink></li>
                                    </>)
                                    : (<>
                                        {/* <li><NavLink to="/register">Register</NavLink></li> */}
                                        <li><NavLink to="/login"><IoLogInOutline size={18} /><span className="icon">Login</span></NavLink></li>
                                    </>)
                                }
                                {user.isAdmin ? (
                                    <>
                                        {/* <li><NavLink to="/profile">Profile</NavLink></li> */}
                                        <li onClick={()=>setIsMenuOpen(false)}><NavLink to="/admin"><MdOutlineAdminPanelSettings size={18} /><span className="icon">Admin</span></NavLink></li>
                                    </>
                                ) : ("")}
                            </ul>
                        </nav>
                    </div>
                ) : ("")
            }
        </>
    );
};
