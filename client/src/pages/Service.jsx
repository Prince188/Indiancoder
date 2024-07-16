import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { NavLink, Navigate } from "react-router-dom";
import { usePagination } from "../components/Pagination";
import Pagination from '@mui/material/Pagination'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import Form from 'react-bootstrap/Form';
import '../style/Service.css';

// import Pagination from 'react-bootstrap/Pagination';

export const Service = () => {
    const { services, user, getServices, authorizationToken, API } = useAuth();
    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [image, setImage] = useState("");
    const [selectedOpt, setSelectedOpt] = useState("Select")
    const [searchBar, setSearchBar] = useState("")
    const [wishlist, setWishlist] = useState([]);
    const [serviceData, setServiceData] = useState({
        service: "",
        description: "",
        price: "",
        provider: "",
        link: "",
        source: [],
        category: "",
        pic: "",
    });
    const [serviceDataUpdate, setServiceDataUpdate] = useState({
        service: "",
        description: "",
        price: "",
        provider: "",
        link: "",
        source: [],
        category: "",
        pic: ""
    });
    console.log("services.length", services.length)
    const countTotalRecord = 0
    const [currentPageIndex, setCurrentPageIndex] = useState()

    // const [totalPages, startPageIndex, endPageIndex, currentPageIndex, displayPages] = usePagination(6, totalRecord);

    useEffect(() => {
        getServices();
    }, []);

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === "source") {
            setServiceDataUpdate((prev) => ({
                ...prev,
                [name]: value.split(",")
            }));
        } else {
            setServiceData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleInputUpate = (e) => {
        const { name, value } = e.target;
        if (name === "source") {
            setServiceDataUpdate((prev) => ({
                ...prev,
                [name]: value.split(",")
            }));
        } else {
            setServiceDataUpdate((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API}/api/data/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': authorizationToken,
                }
            });

            if (response.ok) {
                toast.success("Service deleted successfully");
                getServices();
            } else {
                toast.error("Failed to delete service");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete service");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newServiceData = { ...serviceData, pic: image };

        try {
            const response = await fetch(`${API}/api/data/form`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newServiceData)
            });

            if (response.ok) {
                setServiceData({
                    service: "",
                    description: "",
                    price: "",
                    provider: "",
                    link: "",
                    source: [],
                    category: "",
                    pic: "",
                });
                toast.success("Service added successfully");
            } else {
                toast.error("Failed to add service");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to add service");
        }
        setModal(false);
        getServices();
    };

    const handleUpdate = (service) => {
        setServiceDataUpdate(service);
        setUpdateModal(true);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API}/api/data/update/${serviceDataUpdate._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': authorizationToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(serviceDataUpdate)
            });

            if (response.ok) {
                toast.success("Service updated successfully");
                setUpdateModal(false);
                getServices();
            } else {
                toast.error("Failed to update service");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update service");
        }
    };

    const handleDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleImage = async (pics) => {
        if (pics === undefined) {
            toast.error("Please select the thumbnail", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }

        if (pics.type === "image/png" || pics.type === "image/jpeg") {
            const picData = new FormData();
            picData.append("file", pics);
            picData.append("upload_preset", "indian-coder");
            picData.append("cloud_name", "dzqfgfran");
            fetch("https://api.cloudinary.com/v1_1/dzqfgfran/image/upload", {
                method: "POST",
                body: picData
            }).then((res) => res.json())
                .then((picData) => {
                    setImage(picData.url.toString());
                })
        }
    }

    const handleSelect = (event) => {
        const value = event.target.value
        setSelectedOpt(value)
        console.log(value)
    }

    const handleSearchBar = (event) => {
        const value = event.target.value
        setSearchBar(value)
    }

    // const addToCart = async (serviceId) => {
    //     try {
    //         let response;
    //         if (wishlist.includes(serviceId)) {
    //             response = await fetch(`${API}/api/data/wishlist/${serviceId}`, {
    //                 method: 'DELETE',
    //                 headers: {
    //                     'Authorization': authorizationToken,
    //                     'Content-Type': 'application/json'
    //                 }
    //             });
    //         } else {
    //             response = await fetch(`${API}/api/data/wishlist/${serviceId}`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Authorization': authorizationToken,
    //                     'Content-Type': 'application/json'
    //                 }
    //             });
    //         }
    //         if (response.ok) {
    //             toast.success(`Service ${wishlist.includes(serviceId) ? 'removed from' : 'added to'} wishlist`);
    //             setWishlist((prev) => {
    //                 if (prev.includes(serviceId)) {
    //                     return prev.filter((id) => id !== serviceId);
    //                 } else {
    //                     return [...prev, serviceId];
    //                 }
    //             });
    //         } else {
    //             toast.error('Failed to update wishlist');
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         toast.error('Failed to update wishlist');
    //     }
    // };

    useEffect(() => {
        setCurrentPageIndex(1);
    }, [selectedOpt, searchBar]);

    const filteredServices = services.filter(service =>
        (selectedOpt === "Select" || service.category === selectedOpt) &&
        service.service.toLowerCase().includes(searchBar.toLowerCase())
    );

    const totalRecord = filteredServices.length;
    const recordsPerPage = 6;
    const totalPages = Math.ceil(totalRecord / recordsPerPage);
    const startIndex = (currentPageIndex - 1) * recordsPerPage;
    const endIndex = Math.min(startIndex + recordsPerPage, totalRecord);

    return (
        <>
            <div className="main">
                <div className="service-section">
                    <div className="service-head">
                        <form action="">
                            <input type="search" placeholder="Search here" id="serachbar" value={searchBar} onChange={handleSearchBar} />
                        </form>
                        <div className="div1">
                            <Form.Select value={selectedOpt} onChange={handleSelect}>
                                <option value={"Select"}>Select</option>
                                <option value={"Projects"}>Projects</option>
                                <option value={"Solved questions"}>Solved Questions</option>
                                <option value={"Topics"}>Topics</option>
                            </Form.Select>
                        </div>
                        {
                            user.isAdmin && (
                                <button className="btn" onClick={() => setModal(true)}>Add Data</button>
                            )
                        }
                    </div>
                </div>
                <div className="service-cards">
                    {/* <div className="service-card">
                        <div className="service-header">
                            <div className="service-detail">
                                <div className="service-name">
                                    Title
                                </div>
                                <div className="service-desc">
                                    Description
                                </div>
                            </div>
                        </div>
                        <div className="service-pic">
                            <img src="/images/thumb.png" alt="" />
                        </div>
                        <div className="">
                            <NavLink><button className="btn-outer">Learn More</button></NavLink>
                        </div>
                    </div> */}
                    {
                        filteredServices && filteredServices.length > 0 ? (
                            filteredServices.slice(startIndex, endIndex).map((service, index) => (
                                <div className="service-card" key={service._id}>
                                    <div className="service-header">
                                        <div className="service-detail">
                                            <div className="service-name">
                                                {service.service}
                                            </div>
                                            <div className="service-desc">
                                                {service.description}
                                            </div>
                                        </div>
                                        <div className="numbering">
                                            {startIndex + index + 1 < 10 ? `0${startIndex + index + 1}` : startIndex + index + 1}
                                        </div>
                                    </div>
                                    <div className="service-pic">
                                        <img src={service.pic || "/images/thu.jpg"} alt="Service" />
                                    </div>
                                    <div className="btns">
                                        <NavLink to={`/Singleservice/${service._id}`}>
                                            <button className="btn-outer">Learn More</button>
                                        </NavLink>
                                        {user.isAdmin && (
                                            <div className="service-btn">
                                                <button onClick={() => handleUpdate(service)}><MdEdit /></button>
                                                <button onClick={() => handleDelete(service._id)}><MdDelete /></button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-services-message">
                                No services found matching your criteria.
                            </div>
                        )
                    }

                </div>
                <div className="container">
                    <button
                        onClick={() => setCurrentPageIndex((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPageIndex === 1}
                    >
                        &larr;
                    </button>
                    {
                        totalPages > 0 ? `${currentPageIndex} of ${totalPages} pages` : `${currentPageIndex} of 1 pages`
                    }
                    {/* {currentPageIndex} of {totalPages} pages */}
                    <NavLink><button
                        onClick={() => setCurrentPageIndex((prev) => (prev + 1))}
                        disabled={currentPageIndex >= totalPages}
                    >
                        &rarr;
                    </button></NavLink>
                </div>
            </div>
            {/* Modal for adding the data  */}
            {
                modal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="service">Service</label>
                                    <input type="text" name="service" id="service" placeholder="Enter name" required autoComplete="off" value={serviceData.service} onChange={handleInput} />
                                </div>
                                <div>
                                    <label htmlFor="description">Description</label>
                                    <input type="text" name="description" id="description" placeholder="Enter description" required autoComplete="off" value={serviceData.description} onChange={handleInput} />
                                </div>
                                <div>
                                    <label htmlFor="price">Price</label>
                                    <input type="text" name="price" id="price" placeholder="Enter price" required autoComplete="off" value={serviceData.price} onChange={handleInput} />
                                </div>
                                <div>
                                    <label htmlFor="provider">Provider</label>
                                    <input type="text" name="provider" id="provider" placeholder="Enter provider name" required autoComplete="off" value={serviceData.provider} onChange={handleInput} />
                                    {/* <textarea name="provider" id="provider" placeholder="Enter provider name" required autoComplete="off" value={serviceData.provider} onChange={handleInput}></textarea> */}
                                </div>
                                <div>
                                    <label htmlFor="link">Link</label>
                                    <input type="text" name="link" id="link" placeholder="Enter link" autoComplete="off" value={serviceData.link} onChange={handleInput} />
                                </div>
                                <div>
                                    <label htmlFor="category">Category</label>
                                    <select name="category" value={serviceData.category} onChange={handleInput}>
                                        <option value="Select">Select the category</option>
                                        <option value="Projects">Projects</option>
                                        <option value="Solved questions">Solved questions</option>
                                        <option value="Topics">Topics</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="pic">Thumbail</label>
                                    <input type="file" name="pic" id="pic" accept="image/" placeholder="Select the thumbail" autoComplete="off" onChange={(e) => handleImage(e.target.files[0])}></input>
                                </div>

                                <br />
                                <div className="btn-group">
                                    <button type="submit">Insert</button>
                                    <button type="button" onClick={() => setModal(false)} >Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            {/* Modal for updating the data  */}
            {
                updateModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <form onSubmit={handleUpdateSubmit}>
                                <div>
                                    <label htmlFor="service">Service</label>
                                    <input type="text" name="service" id="service" placeholder="Enter name" required autoComplete="off" value={serviceDataUpdate.service} onChange={handleInputUpate} />
                                </div>
                                <div>
                                    <label htmlFor="description">Description</label>
                                    <input type="text" name="description" id="description" placeholder="Enter description" required autoComplete="off" value={serviceDataUpdate.description} onChange={handleInputUpate} />
                                </div>
                                <div>
                                    <label htmlFor="price">Price</label>
                                    <input type="text" name="price" id="price" placeholder="Enter price" required autoComplete="off" value={serviceDataUpdate.price} onChange={handleInputUpate} />
                                </div>
                                <div>
                                    <label htmlFor="provider">Provider</label>
                                    <input type="text" name="provider" id="provider" placeholder="Enter provider name" required autoComplete="off" value={serviceDataUpdate.provider} onChange={handleInputUpate} />
                                </div>
                                <div>
                                    <label htmlFor="link">Link</label>
                                    <input type="text" name="link" id="link" placeholder="Enter link" required autoComplete="off" value={serviceDataUpdate.link} onChange={handleInputUpate} />
                                </div>
                                <div>
                                    <label htmlFor="category">Category</label>
                                    <select name="category" value={serviceDataUpdate.category} onChange={handleInputUpate}>
                                        <option value="Select">Select the category</option>
                                        <option value="Projects">Projects</option>
                                        <option value="Solved questions">Solved questions</option>
                                        <option value="Topics">Topics</option>
                                    </select>
                                </div>
                                <br />
                                <div className="btn-group">
                                    <button type="submit">Update</button>
                                    <button type="button" onClick={() => setUpdateModal(false)} >Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
};
