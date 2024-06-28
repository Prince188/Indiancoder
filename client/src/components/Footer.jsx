import React from 'react'
// import { NavLink } from 'react-router-dom'
import './Footer.css'


const Footer = () => {
    return (
        <footer>
            {/* <div className="footer-small">
                <p>Check our coding questions &rarr;</p>
                <div className="btn">
                    <button>Contact US</button>
                </div>
            </div> */}
            <div className="container-footer">
                <div className='footer-head'>
                    Prince Patel
                </div>
                <div className="footer-body">
                    <div className="grid grid-three-cols">
                        <div className="div1">
                            <p>Get in touch</p>
                            <h2>abc@gmail.com</h2>
                        </div>
                        <div className="div1">
                            <p>Connect</p>
                            <h2><a href="https://www.instagram.com/indian_.coder/" target='_blank'>INSTAGRAM</a></h2>
                        </div>
                        <div className="div1">
                            <p>Design service</p>
                            <h2>Prince design service <br />Surat , Gujarat</h2>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
