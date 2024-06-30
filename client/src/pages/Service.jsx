import { useState } from "react";
import { useAuth } from "../store/auth";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

export const Service = () => {
    const { services, user, getServices, authorizationToken, API } = useAuth();
    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [serviceData, setServiceData] = useState({
        service: "",
        description: "",
        price: "",
        provider: "",
        link: "",
        source: [] // Changed to array
    });
    const [serviceDataUpdate, setServiceDataUpdate] = useState({
        service: "",
        description: "",
        price: "",
        provider: "",
        link: "",
        source: [] // Changed to array
    });

    //& Handle input while adding or updating the data 

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name === "source") {
            value = value.split("[SPLIT_HERE]"); // Split the input by commas
        }

        if (updateModal) {
            setServiceDataUpdate({
                ...serviceDataUpdate,
                [name]: value
            });
        } else {
            setServiceData({
                ...serviceData,
                [name]: value
            });
        }
    };

    //& Handle delete the data 


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
        getServices();
    };

    //& Handle submit the data 


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API}/api/data/form`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(serviceData)
            });

            if (response.ok) {
                setServiceData({
                    service: "",
                    description: "",
                    price: "",
                    provider: "",
                    link: "",
                    source: []
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

    //& Handle update the data 


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

    //& Handle date 

    const handleDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="main">
            <section className="section-registration">
                <div className="admin">
                    <h1 className="main-heading">Services</h1>
                    {
                        user.isAdmin && (
                            <button className="btn" onClick={() => setModal(true)}>Add Data</button>
                        )
                    }
                </div>
                <div className="container grid grid-three-cols">
                    {
                        services.map((curElem, index) => (
                            <div className="card" key={index}>
                                <div className="price">
                                    {/* <p>{curElem.price}</p> */}
                                </div>
                                <div className="card-img">
                                    <img src="/images/thu.jpg" alt="" />
                                    {
                                        user.isAdmin && (
                                            <div className="service-btn">
                                                {/* <button><FaArrowAltCircleRight /> </button> */}
                                                <button onClick={() => handleUpdate(curElem)}> <MdEdit /></button>
                                                <button onClick={() => handleDelete(curElem._id)}> <MdDelete /></button>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="card-details">
                                    <div className="grid">
                                        <div className="o" style={{ display: 'flex', marginRight: 'auto' }}>
                                            <p title={curElem.provider}>{curElem.provider}</p>
                                            {/* <button style={{height :30 , width : 30 , display : 'flex', fontSize : '3.5rem' , justifyContent : 'center' , alignItems : 'center' }}>&raquo;</button> */}
                                        </div>
                                    </div>
                                    <h2 title={curElem.service}>{curElem.service}</h2>
                                    <p title={curElem.description}>{curElem.description}</p>
                                    <div className="p" style={{ display: 'flex', alignItem: 'center', justifyContent: 'space-between' }}>
                                        {/* {curElem.link ? (<p title={curElem.description}><NavLink to={curElem.link}  style={{fontSize : '14px'}}>Click to visit</NavLink></p>) : ("")} */}
                                        <NavLink to={`/Singleservice/${curElem._id}`} ><button>Learn more</button></NavLink>
                                        Uploaded on : {handleDate(curElem.createdAt)}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
            {/* Modal for adding the data  */}
            {
                modal && (
                    <div className="modal">
                        <div className="modalCont">
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
                                    <label htmlFor="source">Source code</label>
                                    <textarea name="source" id="source" placeholder="Enter source(s), comma-separated" required autoComplete="off" value={serviceData.source.join("[SPLIT_HERE]")} onChange={handleInput}></textarea>
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
                    <div className="modal">
                        <div className="modalCont">
                            <form onSubmit={handleUpdateSubmit}>
                                <div>
                                    <label htmlFor="service">Service</label>
                                    <input type="text" name="service" id="service" placeholder="Enter name" required autoComplete="off" value={serviceDataUpdate.service} onChange={handleInput} />
                                </div>
                                <div>
                                    <label htmlFor="description">Description</label>
                                    <input type="text" name="description" id="description" placeholder="Enter description" required autoComplete="off" value={serviceDataUpdate.description} onChange={handleInput} />
                                </div>
                                <div>
                                    <label htmlFor="price">Price</label>
                                    <input type="text" name="price" id="price" placeholder="Enter price" required autoComplete="off" value={serviceDataUpdate.price} onChange={handleInput} />
                                </div>
                                <div>
                                    <label htmlFor="provider">Provider</label>
                                    <input type="text" name="provider" id="provider" placeholder="Enter provider name" required autoComplete="off" value={serviceDataUpdate.provider} onChange={handleInput} />
                                </div>
                                <div>
                                    <label htmlFor="link">Link</label>
                                    <input type="text" name="link" id="link" placeholder="Enter link" required autoComplete="off" value={serviceDataUpdate.link} onChange={handleInput} />
                                </div>
                                <div>
                                    <label htmlFor="source">Source code</label>
                                    <textarea name="source" id="source" placeholder="Enter source(s), comma-separated" required autoComplete="off" value={serviceDataUpdate.source.join("[SPLIT_HERE]")} onChange={handleInput}></textarea>
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
        </div>
    );
};
