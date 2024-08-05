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
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.77856654977!2d72.77024267471904!3d21.20095368184314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d275053f069%3A0x94d6c57b9fa1bf01!2sRaj%20Corner!5e0!3m2!1sen!2sin!4v1722442341521!5m2!1sen!2sin" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </div >
    )
}
