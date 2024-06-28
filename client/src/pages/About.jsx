import { NavLink } from "react-router-dom"
import { Analytics } from "../components/Analytics"
import { useAuth } from "../store/auth"
import { useState } from "react"

export const About = () => {

    const [about , setAbout ] = useState({
        username:"",
    })

    const { user } = useAuth()
    const [userData , setUserData] = useState(true)

    if(userData && user){
        setAbout({
            username: user.username,
        })
        setUserData(false)
    }

    return (
        <div className="main">
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-content">
                        <p>Welcome , {about.username} </p>
                        <h1>Why we?</h1>
                        <p>
                            We provides best solutions of trending coding technology.
                        </p>
                        <p>
                            We provides best questions , which helps you to improve your coding knowledge and skills.
                        </p>
                        <p>
                            We provides best projects which you can do and improve your skills.
                        </p>
                        <div className="btn btn-group">
                            <NavLink to="/contact">
                                <button className="btn">connect now</button>
                            </NavLink>
                        </div>
                    </div>

                    {/* hero images */}

                    <div className="hero-images" >
                        <img src="/images/about.png" alt="about us page" height={450} />
                    </div>
                </div>
            </section>
            <Analytics />
        </div>
    )
}
