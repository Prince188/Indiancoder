import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MdDelete, MdEdit, MdOutlineContentCopy, MdSave, MdCancel } from "react-icons/md";
import { useScrollPosition } from "../components/useScrollPosition";

const Singleservice = () => {
    const { id } = useParams();
    const { authorizationToken, API, getServices, user } = useAuth();
    const [curElem, setCurElem] = useState(null);
    const [newSource, setNewSource] = useState("");
    const [editedSource, setEditedSource] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const navigate = useNavigate()
    const scrollPosition = useScrollPosition();

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await fetch(`${API}/api/data/service/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': authorizationToken,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setCurElem(data);
                } else {
                    toast.error("Failed to fetch service data");
                }
            } catch (error) {
                console.error("Error fetching service data:", error);
                toast.error("Failed to fetch service data");
            }
        };

        fetchService();
    }, [id, API, authorizationToken]);

    const handleDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleNewSourceChange = (e) => {
        setNewSource(e.target.value);
    };

    const handleEditSourceChange = (e) => {
        setEditedSource(e.target.value);
    };

    const handleAddSource = async () => {
        if (newSource.trim() === "") {
            toast.error("Source code snippet cannot be empty");
            return;
        }

        const updatedService = {
            ...curElem,
            source: [...curElem.source, newSource]
        };

        try {
            const response = await fetch(`${API}/api/data/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': authorizationToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedService)
            });

            if (response.ok) {
                toast.success("Source code snippet added successfully");
                setCurElem(updatedService);
                setNewSource("");
                getServices();
            } else {
                toast.error("Failed to add source code snippet");
            }
        } catch (error) {
            console.error("Error adding source code snippet:", error);
            toast.error("Failed to add source code snippet");
        }
    };

    const handleDeleteSource = async (index) => {
        const updatedSource = [...curElem.source];
        const deletedSnippet = updatedSource.splice(index, 1)[0];

        const updatedService = {
            ...curElem,
            source: updatedSource
        };

        try {
            const response = await fetch(`${API}/api/data/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': authorizationToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedService)
            });

            if (response.ok) {
                toast.success("Source code snippet deleted successfully");
                setCurElem(updatedService);
                getServices();
            } else {
                toast.error("Failed to delete source code snippet");
            }
        } catch (error) {
            console.error("Error deleting source code snippet:", error);
            toast.error("Failed to delete source code snippet");
        }
    };

    const handleEditSource = (index) => {
        setEditingIndex(index);
        setEditedSource(curElem.source[index]);
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditedSource("");
    };

    const handleSaveSource = async (index) => {
        const updatedSource = [...curElem.source];
        updatedSource[index] = editedSource;

        const updatedService = {
            ...curElem,
            source: updatedSource
        };

        try {
            const response = await fetch(`${API}/api/data/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': authorizationToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedService)
            });

            if (response.ok) {
                toast.success("Source code snippet updated successfully");
                setCurElem(updatedService);
                setEditingIndex(null);
                setEditedSource("");
                getServices();
            } else {
                toast.error("Failed to update source code snippet");
            }
        } catch (error) {
            console.error("Error updating source code snippet:", error);
            toast.error("Failed to update source code snippet");
        }
    };

    const handleBack = () => {
        navigate(-1);
        setTimeout(() => {
            window.scrollTo(0, scrollPosition);
        }, 0);
    };

    if (!curElem) {
        return <p>Loading...</p>;
    }

    return (
        <div className="main">
            <section className="section-registration">
                <div className="admin">
                    <h1 className="main-heading" style={{ opacity: 0 }}>Services</h1>
                    <button className="btn" onClick={handleBack}>Back</button>
                </div>

                <div className="container grid grid-two-cols">
                    <div className="div1">
                        <div className="card">
                            <div className="price"></div>
                            <div className="card-img">
                                <img src="/images/thu.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="single-service">
                        <div className="service-name">
                            <dt><h2>Service</h2></dt>
                            <dd><h2>{curElem.service}</h2></dd>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <NavLink to='/service'><button>Watch video</button></NavLink>
                </div>
                <div className="container">
                    <div className="service-name2">
                        <dt><h2>Description</h2></dt>
                        <dd><h2>{curElem.description}</h2></dd>
                    </div>

                    {
                        user.isAdmin ?
                            (
                                <div className="add-source">
                                    <label htmlFor="source">Source code</label>
                                    <textarea name="source" id="source" placeholder="Enter source(s), comma-separated" required autoComplete="off" value={newSource} onChange={handleNewSourceChange}></textarea>
                                    <button onClick={handleAddSource}>Add Source</button>
                                </div>
                            )
                            : ("")
                    }
                </div>
            </section>

            <section className="section-registration">
                <div className="container grid grid-two-cols">
                    {curElem.source.map((snippet, index) => (
                        <div className="source-code" key={index}>
                            {
                                user.isAdmin ?
                                    (
                                        editingIndex === index ?
                                            (
                                                <div className="service-btns">
                                                    <button onClick={() => handleSaveSource(index)}><MdSave /> </button>
                                                    <button onClick={handleCancelEdit}><MdCancel /> </button>
                                                </div>
                                            ) :
                                            (
                                                <div className="service-btns">
                                                    <button onClick={() => handleDeleteSource(index)}><MdDelete /> </button>
                                                    <button onClick={() => handleEditSource(index)}><MdEdit /> </button>
                                                    {/* <button> <MdOutlineContentCopy /></button> */}
                                                </div>
                                            )
                                    ) :
                                    (
                                        <div className="service-btns">
                                            {/* <button> <MdOutlineContentCopy /></button> */}
                                        </div>
                                    )
                            }
                            {editingIndex === index ?
                                (
                                    <textarea value={editedSource} onChange={handleEditSourceChange} />
                                ) :
                                (
                                    <SyntaxHighlighter language="javascript" style={tomorrow} className="custom-syntax-highlighter">
                                        {snippet}
                                    </SyntaxHighlighter>
                                )
                            }
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Singleservice;
