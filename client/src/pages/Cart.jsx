import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useEffect } from "react";

export const Cart = () => {
    const { wishlist, getWishlist } = useAuth();

    useEffect(() => {
        getWishlist();
    }, []);

    return (
        <div className="main">
            {wishlist.map((curElem, index) => (
                <div className="card" key={index}>
                    <div className="price">
                        {/* Display price if available */}
                        {/* <p>{curElem.price}</p> */}
                    </div>
                    <div className="card-img">
                        {/* Display image, default to placeholder if no image */}
                        <img src={curElem.pic ? curElem.pic : "/images/thu.jpg"} alt="" />
                    </div>
                    <div className="card-details">
                        <div className="grid">
                            <div className="o" style={{ display: 'flex', marginRight: 'auto' }}>
                                {/* Display provider */}
                                <p title={curElem.provider}>{curElem.provider}</p>
                                {/* Optionally add a button */}
                                {/* <button style={{ height: 30, width: 30, display: 'flex', fontSize: '3.5rem', justifyContent: 'center', alignItems: 'center' }}>&raquo;</button> */}
                            </div>
                        </div>
                        {/* Display service name */}
                        <h2 title={curElem.service}>{curElem.service}</h2>
                        {/* Display description */}
                        <p title={curElem.description}>{curElem.description}</p>
                        <div className="p" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {/* Optionally display a link */}
                            {/* {curElem.link ? (<p title={curElem.description}><NavLink to={curElem.link} style={{ fontSize: '14px' }}>Click to visit</NavLink></p>) : ("")} */}
                            {/* Navigate to single service page */}
                            <NavLink to={`/Singleservice/${curElem._id}`}><button>Learn more</button></NavLink>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
