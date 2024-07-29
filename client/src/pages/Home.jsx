import { NavLink, Navigate } from 'react-router-dom'
import { Analytics } from '../components/Analytics'
// import { useEffect, useState } from 'react';
import '../style/Home.css'
import { useAuth } from '../store/auth';
import { BsLightningChargeFill } from "react-icons/bs";
import { useEffect } from 'react';
import useScrollToTop from '../components/useScrollToTop';


export const Home = () => {
    useScrollToTop();


    const { isLoggedIn, services } = useAuth()

    if (!isLoggedIn) {
        return <Navigate to='/login' />;
    }


    return (
        <div>
            <div className="home-banner">
                <div className="banner-1">
                    <div className='banner-head'>
                        <span style={{ backgroundColor: '#000', borderRadius: 5, color: '#9754cb', padding: 5 }}><BsLightningChargeFill size={48} /></span> Unlock Your Creative Potential
                    </div>
                    <div className='banner-body'>
                        With Prince's provided solutions
                    </div>
                </div>
                <div className="banner-2">
                    <NavLink to='/service'><button className='btn'>Explore Course</button></NavLink>
                    <NavLink to='/contact'><button className='btn'>Contact Us</button></NavLink>
                </div>
            </div>
            {/* Analytic Section */}
            {/* <Analytics /> */}
            {/* Benifit Section */}
            <div className="home-benifit main">
                <div className="benifit-header">
                    <div className="benifit-name">Benifits</div>
                    {/* <div className="benifit-btn"><button className='btn-outer'>View All</button></div> */}
                </div>
                <div className="benifit-body">
                    <div className="benifit-card">
                        <div className="numbering">
                            01
                        </div>
                        <div className="benifit-card-info">
                            Expert Instruction
                            <div className="benifit-detail">
                                Learn from begginig to advance in designing and developing.
                            </div>
                        </div>
                    </div>
                    {/* ----------------- */}
                    <div className="benifit-card">
                        <div className="numbering">
                            02
                        </div>
                        <div className="benifit-card-info">
                            Updated Curriculum
                            <div className="benifit-detail">
                                Access the course with up-to-date content reflecting the latest trends.
                            </div>
                        </div>
                    </div>
                    {/* ----------------- */}
                    <div className="benifit-card">
                        <div className="numbering">
                            03
                        </div>
                        <div className="benifit-card-info">
                            Interactive Learning Environment
                            <div className="benifit-detail">
                                Collaborate with  fellow learners. exchanging the ideas and feedbacks.
                            </div>
                        </div>
                    </div>
                    {/* ------------------- */}
                    <div className="benifit-card">
                        <div className="numbering">
                            04
                        </div>
                        <div className="benifit-card-info">
                            Practical Projects and Assignments
                            <div className="benifit-detail">
                                Devlop a protfolio showcasting your skills and abilities to potential employers.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Courses Section */}
            <div className="home-course main">
                <div className="benifit-header">
                    <div className="benifit-name">Our Courses</div>
                    <div className="benifit-btn"><NavLink to='/service'><button className='btn-outer'>View All</button></NavLink></div>
                </div>
                <div className="course-body">
                    {/* <div className="course-card">
                        <div className="course-card-info">
                            <div className="course-img">
                                <img src="/images/thu.jpg" alt="" />
                            </div>
                            <div className="course-detail">
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut cum reiciendis deserunt eum voluptates eligendi inventore mollitia repellendus quos adipisci.</p>
                                <div className='course-des'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus facilis mollitia, molestias ut, voluptatum voluptas aut iure impedit quae ducimus culpa laudantium vitae ullam iusto.</div>
                            </div>
                        </div>
                        <NavLink to={`/Singleservice/`}><button>Learn More</button></NavLink>
                    </div> */}
                    {(() => {
                        const renderedServices = [];
                        for (let i = 0; i <= 3; i++) {
                            const service = services[i];
                            if (service) {
                                renderedServices.push(
                                    <div className="course-card">
                                        <div className="course-card-info">
                                            <div className="course-img">
                                                <img src={service.pic ? service.pic : "/images/thu.jpg"} alt="" />
                                            </div>
                                            <div className="course-detail">
                                                <p>{service.service}</p>
                                                <div className='course-des'>{service.description}</div>
                                            </div>
                                        </div>
                                        <NavLink to={`/Singleservice/${service._id}`}><button>Learn More</button></NavLink>
                                    </div>
                                )
                            }
                        }
                        return renderedServices;
                    })()}
                </div>
            </div>
        </div>
    )
}
