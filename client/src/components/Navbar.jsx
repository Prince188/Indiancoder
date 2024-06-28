import React from 'react'
import './Navbar.css'
import { useAuth } from '../store/auth'
import { NavLink } from 'react-router-dom'


export const Navbar = () => {
    const { isLoggedIn, user } = useAuth()
    return (
        <header>
            <div className="container">
                <div className="logo-brand">
                    <NavLink to="/">Indian Coder</NavLink>
                </div>

                <nav>
                    <ul>

                        {isLoggedIn ?
                            (<>
                                <li><NavLink to="/">Home</NavLink></li>
                                <li><NavLink to="/about">About</NavLink></li>
                                <li><NavLink to="/service">Service</NavLink></li>
                                <li><NavLink to="/contact">Contact</NavLink></li>
                                <li><NavLink to="/logout">Logout</NavLink></li>
                            </>)
                            : (<>
                                <li><NavLink to="/register">Register</NavLink></li>
                                <li><NavLink to="/login">Login </NavLink></li>
                            </>
                            )
                        }
                        {
                            user.isAdmin ? (
                                <>
                                    <li><NavLink to="/profile">Profile</NavLink></li>
                                    <li><NavLink to="/admin">Admin</NavLink></li>
                                </>) : ("")
                        }
                    </ul>
                </nav>
            </div>
        </header>
    )
}

