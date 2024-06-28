import { useState } from "react"
import { useAuth } from "../store/auth"

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
            <section>
                <main>
                    <div className="admin">
                        <h1 className="main-heading mb-3">Contact</h1>
                    </div>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="hero-images">
                                <img src="/images/contact.png " alt="Registration" width={500} height={500} />
                            </div>
                            {/* Lets do registration form */}

                            <div className="registration-form">
                                <br />
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
                            </div>
                        </div>
                    </div>
                </main>

                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.790405619698!2d72.76892302788373!3d21.20048355491717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04c4e99b95cf9%3A0x84e446cc0d20d783!2sVasu%20Pujya%20Residency!5e0!3m2!1sen!2sin!4v1718254391767!5m2!1sen!2sin"
                    width="100%"
                    // style={{ margin: 'auto' }}
                    height="350"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" />
            </section>
        </div>
    )
}
