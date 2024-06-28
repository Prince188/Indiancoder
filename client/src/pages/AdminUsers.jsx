import { useEffect, useState } from "react";
import React from 'react';
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { authorizationToken , API } = useAuth();
    const [modal, setModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        _id: "",
        username: "",
        email: "",
        phone: "",
        isAdmin: false // Initial value for isAdmin
    });

    const getAllUsersData = async () => {
        try {
            const response = await fetch(`${API}/api/admin/users`, {
                method: 'GET',
                headers: {
                    'Authorization': authorizationToken,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch users data");
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': authorizationToken,
                }
            });

            if (response.ok) {
                toast.success("User deleted successfully");
                getAllUsersData();
            } else {
                toast.error("Failed to delete user");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete user");
        }
    };

    // handle update for update modal open

    const handleUpdate = (user) => {
        setCurrentUser(user);
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
        try {
            const response = await fetch(`${API}/api/admin/users/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': authorizationToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            });

            if (response.ok) {
                toast.success("User updated successfully");
                setModal(false);
                getAllUsersData();
            } else {
                const errorData = await response.json();
                if (errorData.message === 'Email already exists') {
                    toast.error("Email already exists. Please choose a different email.");
                } else {
                    toast.error(`Failed to update user: ${errorData.message}`);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update user");
        }
    };

    useEffect(() => {
        getAllUsersData();
    }, []);

    return (
        <>
            <div className="main">
                <h2 style={{ fontSize: '3.5rem' }}>Manage Users</h2>
                <div className="container">
                    <table border={0}>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Admin</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((curUser, index) => (
                                <tr
                                    key={curUser._id}
                                    style={{ backgroundColor: curUser.isAdmin ? '#deacf5' : 'white' }}
                                >
                                    <td>{index + 1}</td>
                                    <td>{curUser.username}</td>
                                    <td>{curUser.email}</td>
                                    <td>{curUser.phone}</td>
                                    <td>{curUser.isAdmin ? 'Yes' : 'No'}</td>
                                    <td>
                                        <button onClick={() => handleUpdate(curUser)} >Edit</button>
                                    </td>
                                    <td>
                                        {!curUser.isAdmin && (
                                            <button onClick={() => handleDelete(curUser._id)}>Delete</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {
                modal && (
                    <div className="modal">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">Name</label>
                            <input type="text" id="username" name="username" value={currentUser.username} onChange={handleChange} autoComplete="off" />
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={currentUser.email} onChange={handleChange} autoComplete="off" />
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" id="phone" name="phone" value={currentUser.phone} onChange={handleChange} autoComplete="off" />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input type="checkbox" id="isAdmin" name="isAdmin" checked={currentUser.isAdmin} onChange={handleChange} style={{ width: 20, margin: '0 5px' }} />
                                <label htmlFor="isAdmin" className="isAdmin">Admin</label>
                            </div>
                            <div className="btn-group">
                                <button type="submit">Update</button>
                                <button type="button" onClick={() => setModal(false)}>Close</button>
                            </div>
                        </form>
                    </div>
                )
            }
        </>
    );
};


