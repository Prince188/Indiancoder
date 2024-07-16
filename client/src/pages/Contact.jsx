import { useState } from "react"
import { useAuth } from "../store/auth"
import '../style/Contact.css'
import { NavLink } from 'react-router-dom'
import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin } from "react-icons/io5"

export const Contact = () => {

    const [contact, setContact] = useState({
        username: "",
        email: "",
        message: "",
    })

    const [userData, setUserData] = useState(true)

    const { user, API } = useAuth()
    // setUser

    if (userData && user) {
        setContact({
            username: user.username,
            email: user.email,
        })
        setUserData(false)
    }

    // handleInput

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setContact({
            ...user,
            [name]: value
        })
    }

    // handleSubmit

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API}/api/form/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contact)
            })

            if (response.ok) {
                setContact({
                    message: ""
                })
            }
        } catch (error) {

        }
    }

    return (

        <div className="main">
            <div className="contact-section">
                <div className="contact-head">
                    <div className="contact-tit">
                        Contact Us
                    </div>
                    <div className="contact-desc">
                        Welcome to SkillBridge's Pricing Plan page, where we offer two comprehensive options to cater to your needs: Free and Pro. We believe in providing flexible and affordable pricing options for our services. Whether you're an individual looking to enhance your skills or a business seeking professional development solutions, we have a plan that suits you. Explore our pricing options below and choose the one that best fits your requirements.
                    </div>
                </div>
                <div className="contact-form">
                    <form action="" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="text" id="text" placeholder="Enter name" required autoComplete="off" value={contact.username} onChange={handleInput} />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="Enter email" required autoComplete="off" value={contact.email} onChange={handleInput} />
                        </div>
                        <div>
                            <label htmlFor="message">Message</label>
                            <textarea name="message" id="message" rows={8} cols={3} placeholder="Enter message" required autoComplete="off" value={contact.message} onChange={handleInput} />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-submit">Submit</button>
                    </form>
                    <div className="social-connect">
                        <h2>Connect With Us on other plateforms</h2>
                        <div className="social-cont">
                            <NavLink to='https://www.instagram.com/prince._11319/' target="_blank" style={{color : 'white'}}><div className="cont"> <IoLogoInstagram size={24} /> Instagram </div></NavLink>
                            <div className="cont"><IoLogoFacebook size={24} /> Facebook</div>
                            <div className="cont"><IoLogoLinkedin size={24} /> Linkedin</div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
