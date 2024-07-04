import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth';

export const AdminContacts = () => {
    var no = 1

    const [contacts, setContacts] = useState([])

    const { authorizationToken  , API } = useAuth();

    const getAllContactsData = async () => {
        try {
            const response = await fetch(`${API}/api/admin/contact`, {
                method: 'GET',
                headers: {
                    'Authorization': authorizationToken,
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setContacts(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllContactsData()
    }, [])


    return (
        <div className=''>
            <h2 style={{ fontSize: '3.5rem' }}>Manage Contacts</h2>
            <div className="container">
                <table  border={0}>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contacts.map((curUser, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td>{no++}</td>
                                            <td>{curUser.username}</td>
                                            <td>{curUser.email}</td>
                                            <td className='msg'>{curUser.message}</td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
        
    )
}

