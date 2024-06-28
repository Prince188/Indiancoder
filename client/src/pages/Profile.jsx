import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';
import { NavLink } from 'react-router-dom';

export const Profile = () => {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        mobile: '',
        password: '',
    });
    const [modal, setModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        _id: "",
        username: "",
        email: "",
        phone: "",
        isAdmin: false // Initial value for isAdmin
    });
    const [authorizationToken, setAuthorizationToken] = useState('');

    const { user, LogoutUser } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
        setAuthorizationToken(token);

        if (user) {
            setProfile({
                username: user.username,
                email: user.email,
                mobile: user.phone,
                password: user.password, // Directly using user.password here
            });
            setCurrentUser({
                _id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin
            });
        }
    }, [user]);

    const handleUpdate = () => {
        setModal(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentUser((prevUser) => ({
            ...prevUser,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

    };

    return (
        <>
            {
                user.isAdmin ?
                    (
                        <>
                            <div className='main'>
                                <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h1>Profile</h1>
                                    <NavLink to="/logout"><button>Logout</button></NavLink>
                                </div>
                                <div className="container grid grid-two-cols">
                                    <div className="div1 user">
                                        <img src="/images/user.png" alt="User" />
                                    </div>
                                    <div className="div1">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{profile.username}</td>
                                                </tr>
                                                <tr>
                                                    <td>Email</td>
                                                    <td>{profile.email}</td>
                                                </tr>
                                                <tr>
                                                    <td>Mobile</td>
                                                    <td>{profile.mobile}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}>
                                                        <button onClick={handleUpdate}>Edit</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {modal && (
                                    <div className="modal">
                                        <form onSubmit={handleSubmit}>
                                            <label htmlFor="username">Name</label>
                                            <input type="text" id="username" name="username" value={currentUser.username} onChange={handleChange} autoComplete="off" />
                                            <label htmlFor="email">Email</label>
                                            <input type="email" id="email" name="email" value={currentUser.email} onChange={handleChange} autoComplete="off" />
                                            <label htmlFor="phone">Phone</label>
                                            <input type="tel" id="phone" name="phone" value={currentUser.phone} onChange={handleChange} autoComplete="off" />
                                            <div className="btn-group">
                                                <button type="submit">Update</button>
                                                <button type="button" onClick={() => setModal(false)}>Close</button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                            <div className="main">
                                <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h1>This page is under devlopment please visit after some time. Sorry for inconvenience</h1>
                                    <NavLink to="/logout"><button>Logout</button></NavLink>
                                </div>
                            </div>
                        </>
                    )
            }
        </>
    );
};
