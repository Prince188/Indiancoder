import { createContext, useContext, useEffect, useState } from "react";
import { Service } from "../pages/Service";
// import axios from "axios";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState("")
    const [services, setServices] = useState([])
    const authorizationToken = `Bearer ${token}`

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken)
        return (localStorage.setItem('token', serverToken));
    }

    const API =  'https://indiancoder.onrender.com';
    // const API = 'http://localhost:5000'
    // console.log(API)

    let isLoggedIn = !!token
    // console.log("islogged in", isLoggedIn)
    // console.log(authorizationToken);

    // console.log(localStorage.getItem('token'));

    // Logout code

    const LogoutUser = () => {
        setToken("")
        setUser("")
        localStorage.removeItem('token')
    }

    // JWT AUTHANTICATION

    const userAuthantication = async () => {
        console.log(user)
        try {
            const response = await fetch(`${API}/api/auth/user`, {
                method: 'GET',
                headers: {
                    'Authorization': authorizationToken,
                }
            })

            if (response.ok) {
                const data = await response.json()
                setUser(data.userData)
                console.log("Userdata", data.userData);
            }
        } catch (error) {
            console.log("error");
        }
    }

    //to fetch the services data from the db

    const getServices = async () => {
        try {
            const response = await fetch(`${API}/api/data/service`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                const serviceData = await response.json()
                console.log("services data", serviceData.msg);
                setServices(serviceData.msg)
            }
        } catch (error) {
            console.log(`services fronted erroe: ${error}`);
        }
    }

    useEffect(() => {
        if (token) {
            userAuthantication(token)
        }
        getServices()
    }, [token])

    // Fetching service is over


    return (<>
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services, authorizationToken, getServices, API }}>
            {children}
        </AuthContext.Provider>
    </>)
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext)
    if (!authContextValue) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return authContextValue
}