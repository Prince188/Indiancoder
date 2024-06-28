import { NavLink, Navigate } from 'react-router-dom'
import { Analytics } from '../components/Analytics'
// import { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';

export const Home = () => {

    const { isLoggedIn } = useAuth()
    if (!isLoggedIn) {
        return <Navigate to='/login' />;
    }

    return (
        <div className='main'>
            <main>
                <section className="section-hero">
                    <div className="container grid grid-two-cols">
                        <div className="hero-content">
                            <p>We are the best solution provider</p>
                            <h1>Welcome to Prince's solution page</h1>
                            <p>
                                Are you ready to boost your coding knowledge with us? Look no further , we are best solution provider here.
                            </p>
                            <div className="btn btn-group">
                                <NavLink to="/contact">
                                    <button className="btn">connect now</button>
                                </NavLink>
                            </div>
                        </div>

                        {/* hero images */}

                        <div className="hero-images" >
                            <img src="/images/home1.png" alt="home page" />
                        </div>
                    </div>
                </section>

            </main>

            <Analytics />

            {/* 3rd section */}

            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    {/* hero images */}

                    <div className="hero-images">
                        <img src="/images/home2.png" alt="home page" />
                    </div>
                    <div className="hero-content">
                        <p>We are to help you</p>
                        <h1>Get started today</h1>
                        <p>
                            Join us today by clicking on the below button.
                        </p>
                        <div className="btn btn-group">
                            <NavLink to="/contact">
                                <button className="btn">connect now</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
