import { NavLink } from "react-router-dom"
import { useAuth } from "../store/auth"
import { FaAward, FaBook, FaCrown, FaHandshake, FaMasksTheater, FaPuzzlePiece } from "react-icons/fa6";
import { AiFillAlert } from "react-icons/ai";
import { GiUpgrade } from "react-icons/gi";
import { useState } from "react"
import '../style/About.css'
import useScrollToTop from '../components/useScrollToTop';


export const About = () => {
    useScrollToTop();


    const [about, setAbout] = useState({
        username: "",
    })

    const { user } = useAuth()
    const [userData, setUserData] = useState(true)

    if (userData && user) {
        setAbout({
            username: user.username,
        })
        setUserData(false)
    }

    return (
        // <div className="main">
        //     <section className="section-hero">
        //         <div className="container grid grid-two-cols">
        //             <div className="hero-content">
        //                 <p>Welcome , {about.username} </p>
        //                 <h1>Why we?</h1>
        //                 <p>
        //                     We provides best solutions of trending coding technology.
        //                 </p>
        //                 <p>
        //                     We provides best questions , which helps you to improve your coding knowledge and skills.
        //                 </p>
        //                 <p>
        //                     We provides best projects which you can do and improve your skills.
        //                 </p>
        //                 <div className="btn btn-group">
        //                     <NavLink to="/contact">
        //                         <button className="btn">connect now</button>
        //                     </NavLink>
        //                 </div>
        //             </div>

        //             {/* hero images */}

        //             <div className="hero-images" >
        //                 <img src="/images/about.png" alt="about us page" height={450} />
        //             </div>
        //         </div>
        //     </section>
        //     <Analytics />
        // </div>
        <div className="main">
            <div className="about-section">
                <div className="about-head">
                    <div className="about-title">
                        About Us
                    </div>
                    <div className="about-desc">
                        Welcome to our platform, where we are passionate about empowering individuals to master the world of design and development. We offer a wide range of online courses designed to equip learners with the skills and knowledge needed to succeed in the ever-evolving digital landscape.
                    </div>
                </div>
                <div className="about-achive">
                    <div className="achi-head">
                        <div className="head-title">
                            Achievements
                        </div>
                        <div className="head-des">
                            Our commitment to excellence has led us to achieve significant milestones along our journey. Here are some of our notable achievements
                        </div>
                    </div>
                    <div className="achi-cards">
                        <div className="achi-card">
                            <div className="card-tit">
                                <span><FaCrown size={24} /></span> Trusted by Thousands
                            </div>
                            <div className="card-desc">
                                We have successfully served thousands of students, helping them unlock their potential and achieve their career goals.
                            </div>
                        </div>
                        <div className="achi-card">
                            <div className="card-tit">
                                <span><FaAward size={24} /></span> Award-winning Courses
                            </div>
                            <div className="card-desc">
                                Our courses have received recognition and accolades in the industry for their quality, depth of content, and effective teaching methodologies.
                            </div>
                        </div>
                        <div className="achi-card">
                            <div className="card-tit">
                                <span><FaMasksTheater size={24} /></span>Positive Students Feedbacks
                            </div>
                            <div className="card-desc">
                                We take pride in the positive feedback we receive from our students, who appreciate the practicality and relevance of our course materials.
                            </div>
                        </div>
                        <div className="achi-card">
                            <div className="card-tit">
                                <span><FaHandshake size={24} /></span>Strong Partnerships
                            </div>
                            <div className="card-desc">
                                We have established strong partnerships with industry leaders, enabling us to provide our students with access to the latest tools and technologies
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-achive">
                    <div className="achi-head">
                        <div className="head-title">
                            Our Goals
                        </div>
                        <div className="head-des">
                            At SkillBridge, our goal is to empower individuals from all backgrounds to thrive in the world of design and development. We believe that education should be accessible and transformative, enabling learners to pursue their passions and make a meaningful impact.
                            Through our carefully crafted courses, we aim to
                        </div>
                    </div>
                    <div className="achi-cards">
                        <div className="achi-card">
                            <div className="card-tit">
                                <span><GiUpgrade size={24} /></span> Provide Practical Skills
                            </div>
                            <div className="card-desc">
                                We focus on delivering practical skills that are relevant to the current industry demands. Our courses are designed to equip learners with the knowledge and tools needed to excel in their chosen field.
                            </div>
                        </div>
                        <div className="achi-card">
                            <div className="card-tit">
                                <span><FaBook size={24} /></span> Foster Creative Problem-Solving
                            </div>
                            <div className="card-desc">
                                We encourage creative thinking and problem-solving abilities, allowing our students to tackle real-world challenges with confidence and innovation.
                            </div>
                        </div>
                        <div className="achi-card">
                            <div className="card-tit">
                                <span><FaPuzzlePiece size={24} /></span> Promote Collaboration and Community
                            </div>
                            <div className="card-desc">
                                We believe in the power of collaboration and peer learning. Our platform fosters a supportive and inclusive community where learners can connect, share insights, and grow together.
                            </div>
                        </div>
                        <div className="achi-card">
                            <div className="card-tit">
                                <span><AiFillAlert size={24} /></span> Stay Ahead of the Curve
                            </div>
                            <div className="card-desc">
                                The digital landscape is constantly evolving, and we strive to stay at the forefront of industry trends. We regularly update our course content to ensure our students receive the latest knowledge and skills.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
