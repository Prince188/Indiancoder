import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../store/auth"
import { toast } from "react-toastify"


export const Register = () => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    })

    const navigate = useNavigate()

    const { storeTokenInLS, API } = useAuth()

    const URL = `${API}/api/auth/register`


    // handleInput

    const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value
        })
    }

    // handleSubmit

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            console.log(response);
            const res_data = await response.json()
            console.log("RES_DATA", res_data.msg);

            if (response.ok) {


                storeTokenInLS(res_data.token)  //Calling the function to store token in local storage

                setUser({ username: "", email: "", phone: "", password: "" })
                toast.success(`${user.username} you are registered successfully`)
                navigate('/')
            } else {
                toast.error(res_data.msg)
            }
        } catch (error) {
            console.log("Register error: " + error);
        }
        // setUser()
    }

    return (
        <div className="main">
            <section>
                <main>
                    <div className="section-registration">
                        <h1 className="main-heading mb-3">Create an account</h1>
                        <div className="container grid grid-two-cols">
                            <div className="hero-images">
                                <img src="/images/registration.png" alt="Registration" width={400} />
                            </div>
                            {/* Lets do registration form */}

                            <div className="registration-form">
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 400 }}>Create an account to log into your personal place</h2>
                                <br />
                                <form action="" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">Username</label>
                                        <input type="text" name="username" id="username" placeholder="Enter name" required autoComplete="off" value={user.username} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email" placeholder="Enter email" required autoComplete="off" value={user.email} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">Phone</label>
                                        <input type="tel" name="phone" id="phone" placeholder="Enter mobile number" required autoComplete="off" value={user.phone} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" id="password" placeholder="Enter password" required autoComplete="off" value={user.password} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <small>Already a user ? <NavLink to='/login'>Login Now</NavLink></small>
                                    </div>
                                    <br />

                                    <button type="submit" className="btn btn-submit">Register Now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    )
}
