import React from 'react'
// import { NavLink } from 'react-router-dom'
import './Footer.css'
import { CiMail } from "react-icons/ci";
import { BsTelephone } from 'react-icons/bs';
import { IoLocationOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io';
import { PiCopyrightBold } from "react-icons/pi";


const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <div className="div1">
                    <div className="footer-logo">
                        Indian Coder
                    </div>
                    <div className="footer-cont">
                        <div className="cont"><CiMail size={24} /> princezoom24@gmail.com</div>
                        <div className="cont"><BsTelephone size={24} /> +91 91062 69655</div>
                        <div className="cont"><IoLocationOutline size={24} /> Somewhere in the world</div>
                    </div>
                </div>
                <div className="div1">
                    <div className="footer-logo">
                        Get in Touch
                    </div>
                    <div className="footer-cont">
                        <NavLink to='https://www.instagram.com/prince._11319/' target="_blank" style={{ color: 'white' }}><div className="cont"> <IoLogoInstagram size={24} /> Instagram </div></NavLink>
                        <div className="cont"><IoLogoFacebook size={24} /> Facebook</div>
                        <div className="cont"><IoLogoLinkedin size={24} /> Linkedin</div>
                    </div>
                </div>
            </div>
            <div className="" style={{display : 'flex' , alignItems : 'center' , justifyContent : 'center' , marginTop: '20px'}}>
                <p style={{ display: 'flex', alignItems: 'center' }}><PiCopyrightBold size={24} /> 2024 Indian Coder. All right reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
