import { useState, useEffect } from "react";
import '../style/Singleservice.css'
import { NavLink, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MdDelete, MdEdit, MdSave, MdCancel } from "react-icons/md";
import { Service } from "./Service";

const Singleservice = () => {
    const { id } = useParams();
    const { authorizationToken, API, getServices, user } = useAuth(); // Import 
    const [curElem, setCurElem] = useState(null);
    const [newSource, setNewSource] = useState("");
    const [editedSource, setEditedSource] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [player, setPlayer] = useState(null);
    const [newCurriculum, setNewCurriculum] = useState("");
    // const [curriculums, setCurriculums] = useState([]);

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

    const handleNewSourceChange = (e) => {
        setNewSource(e.target.value);
    };

    const handleEditSourceChange = (e) => {
        setEditedSource(e.target.value);
    };

    const handleAddCurriculum = async () => {
        if (newCurriculum.trim() === "") {
            toast.error("Curriculam cannot be empty");
            return;
        }

        const updatedCurri = {
            ...curElem,
            curri: [...curElem.curri, newCurriculum]
        };

        try {
            const response = await fetch(`${API}/api/data/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': authorizationToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCurri)
            });

            if (response.ok) {
                toast.success("Source code snippet added successfully");
                setCurElem(updatedCurri);
                setNewCurriculum("");
                getServices();
            } else {
                toast.error("Failed to add source code snippet");
            }
        } catch (error) {
            console.error("Error adding source code snippet:", error);
            toast.error("Failed to add source code snippet");
        }
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

    if (!curElem) {
        return <p>Loading...</p>;
    }

    const onReady = (event) => {
        setPlayer(event.target)
    }

    const setVideoTime = (timeString) => {
        if (!player) return;

        const [minutes, seconds] = timeString.split(":");
        const totalSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);

        player.seekTo(totalSeconds);
        player.playVideo();
    };

    return (

        <div className="main">
            <div className="single-section">
                <NavLink to='/service'>
                    <button className="btn-outer">
                        Back
                    </button>
                </NavLink>
                {/* //? Video title and desc */}
                <div className="single-head">
                    <div className="single-title">
                        {curElem.service}
                    </div>
                    <div className="single-desc">
                        {curElem.description}
                    </div>
                </div>
                {/* //? Video andcurriculam */}
                <div className="single-video">
                    {/* <div className="">
                        <YouTube
                            videoId='Az4SZ4miZircmqqu'
                            onReady={onReady}
                            ref={playerRef}
                        />
                    </div> */}
                    {/* //? CURRICULAM */}
                    <div className="curri">
                        <div style={{ fontSize: '2.5rem' }}>Topics:</div>
                        <div className="curri-cards">
                            {curElem.curri.map((curriculum, index) => (
                                <div className="curri-card" key={index}>
                                    <div className="curri-text">{curriculum}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="main">
                    {
                        user.isAdmin ?
                            (
                                <>
                                    <div className="add-source">
                                        <textarea name="source" id="source" placeholder="Enter source(s), comma-separated" required autoComplete="off" value={newSource} onChange={handleNewSourceChange}></textarea>
                                        <button onClick={handleAddSource}>Add Source</button>
                                    </div>
                                    <div className="add-curri">
                                        <textarea
                                            name="curri"
                                            id="curri"
                                            placeholder="Enter curri(s), comma-separated"
                                            required
                                            autoComplete="off"
                                            value={newCurriculum}
                                            onChange={(e) => setNewCurriculum(e.target.value)}
                                        ></textarea>
                                        <button onClick={handleAddCurriculum}>Add Curriculum</button>
                                    </div>
                                </>
                            )
                            : ("")
                    }
                </div>

                {/* //? Source codes */}
                <div className="single-source">
                    <div className="code-panels">
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
                                        // <Snippet>
                                        <SyntaxHighlighter language="javascript" style={tomorrow} className="custom-syntax-highlighter">
                                            {snippet}
                                        </SyntaxHighlighter>
                                        // </Snippet>
                                    )
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Singleservice;
