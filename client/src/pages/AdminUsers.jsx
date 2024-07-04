import { useEffect, useState } from "react";
import React from 'react';
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { usePagination } from "../components/Pagination";

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { authorizationToken, API } = useAuth();
    const [modal, setModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        _id: "",
        username: "",
        email: "",
        phone: "",
        isAdmin: false // Initial value for isAdmin
    });

    const [totalPages, startPageIndex, endPageIndex, currentPageIndex, displayPages] = usePagination(5, users.length)

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
            <div className="">
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
                            {(() => {
                                const renderUser = []
                                for (let i = startPageIndex; i <= endPageIndex; i++) {
                                    const index = i
                                    const userData = users[i]
                                    if (userData) {
                                        renderUser.push(
                                            <tr
                                                key={userData._id}
                                                style={{ backgroundColor: userData.isAdmin ? '#deacf5' : 'white' }}
                                            >
                                                <td>{index + 1}</td>
                                                <td>{userData.username}</td>
                                                <td>{userData.email}</td>
                                                <td>{userData.phone}</td>
                                                <td>{userData.isAdmin ? 'Yes' : 'No'}</td>
                                                <td>
                                                    <button onClick={() => handleUpdate(userData)} >Edit</button>
                                                </td>
                                                <td>
                                                    {!userData.isAdmin && (
                                                        <button onClick={() => handleDelete(userData._id)}>Delete</button>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    }
                                }
                                return renderUser
                            })()}
                            <tr>
                                <td colSpan={7}>
                                    <div className="" style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                        <button
                                            onClick={() => currentPageIndex > 1 && displayPages(currentPageIndex - 1)}
                                            style={{ cursor: currentPageIndex > 1 ? 'pointer' : 'no-drop' }}
                                            disabled={currentPageIndex <= 1}
                                        >&larr;</button>
                                        <div className="" style={{ display: 'flex', alignItems: 'center', fontSize: 18 }}>{currentPageIndex} of {totalPages} Pages</div>
                                        <button
                                            onClick={() => currentPageIndex < totalPages && displayPages(currentPageIndex + 1)}
                                            style={{ cursor: currentPageIndex < totalPages ? 'pointer' : 'no-drop' }}
                                            disabled={currentPageIndex >= totalPages}
                                        >&rarr;</button>
                                    </div>
                                </td>
                            </tr>
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


