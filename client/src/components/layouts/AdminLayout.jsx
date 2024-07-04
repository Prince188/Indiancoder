import React, { useEffect, useRef } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6"
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';

export const AdminLayout = () => {
    const { user } = useAuth()
    const navigate = useNavigate();
    const toastShownRef = useRef(false);

    useEffect(() => {
        if (user && !user.isAdmin && !toastShownRef.current) {
            toast.error('You need admin access to visit admin page');
            toastShownRef.current = true; // Ensure the toast is only shown once
            navigate("/", { replace: true }); // Redirect to the home page
        }

    }, [user, navigate]);

    return (
        <div className='main'>
            <div className="section-registration">
                <h1>Welcome Admin</h1>
                <div className="admin">
                    <nav>
                        <ul>
                            <li><NavLink to={"/admin/users"}> <FaUser /> Users</NavLink></li>
                            <li><NavLink to={"/admin/contact"}> <FaMessage />  Contacts</NavLink></li>
                        </ul>
                    </nav>
                </div>
                {/* <img src="/images/admin.png" alt="" width={430} style={{marginLeft : '50%' , transform : 'translateX(-50%)'}} /> */}
            </div>
            <Outlet />
        </div>
    )
}

