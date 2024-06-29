import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../store/auth"
import { toast } from "react-toastify"



export const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const { storeTokenInLS , API } = useAuth()


    // const storeTokenInLS = (token) => {
    //     localStorage.setItem("token", token)
    // }
    // handleInput

    const handleInput = (e) => {
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
            const response = await fetch(`${API}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            console.log(response)
            const res_data = await response.json()


            if (response.ok) {
                setUser({ email: "", password: "" })
                storeTokenInLS(res_data.token)  //Calling the function to store token in local storage

                toast.success(`Welcome back`, {
                })

                navigate("/")
            }
            else {
                toast.error(res_data.msg, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            }
        } catch (error) {
            console.log("error : ", error);
        }
    }

    return (
        <div className="main">
            <section>
                <main>
                    <div className="section-registration">
                        <h1 className="main-heading mb-3">Login</h1>
                        <div className="container grid grid-two-cols">
                            <div className="hero-images">
                                <img src="/images/login.png" alt="Registration" width={400} />
                            </div>
                            {/* Lets do registration form */}

                            <div className="registration-form">
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 400 }}>Hey , welcome back to your special place</h2>
                                <br />
                                <form action="" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email" placeholder="Enter email" required autoComplete="off" value={user.email} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" id="password" placeholder="Enter name" required autoComplete="off" value={user.password} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <small>Not a user ? <NavLink to='/register'>Register Now</NavLink></small>
                                    </div>
                                    <br />

                                    <button type="submit" className="btn btn-submit">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    )
}
