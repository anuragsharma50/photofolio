import { useEffect, useState } from "react";
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot   } from "firebase/firestore"; 
import { ToastContainer,Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from "../firebaseinit";

const Album = ({selectedAlbum,updateSelectedAlbum}) => {

    const [showInputBox,setShowInputBox] = useState(false);
    const [update,setUpdate] = useState(false);
    const [images,setImages] = useState([]);
    const [title,setTitle] = useState("");
    const [url,setURL] = useState("");
    const [id,setId] = useState("");

    useEffect(() => {
        
        const fetchData = async () => {
            onSnapshot(collection(db, "photofolio","albums",selectedAlbum), (snapshots) => {
                const data = snapshots.docs.map((snapshot) => {
                    return {
                        id: snapshot.id,
                        ...snapshot.data()
                    }
                })

                setImages(data);
            });
        }

        fetchData();

    },[selectedAlbum])

    const addImage = async () => {
        if(update) {
            // update DB
            console.log("here");
            const updateRef = doc(db, "photofolio","albums",selectedAlbum,id);
            await updateDoc(updateRef, {
                title,
                url
            });

            setUpdate(false);
            setId("");

            toast.success('Image Updated successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        else{
            // else add new image
            const docRef = await addDoc(collection(db, "photofolio","albums",selectedAlbum), {
                title,
                url
            });
            console.log("Document written with ID: ", docRef.id);
    
            setImages([...images,{title,url,id:docRef.id}]);
            toast.success('Image added successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }

        // then clear input fields in both cases
        setTitle("");
        setURL("");
    }

    const updateHandler = (image) => {
        setUpdate(true);
        setShowInputBox(true);
        setTitle(image.title);
        setURL(image.url);
        setId(image.id);
    }

    const toggleInputFields = () => {
        // setting updates to false when we click on cancel button - so  currently if input fields is 
        // visible, will be set updates to false, as just after that we are hinding input fields
        if(showInputBox) {
            setUpdate(false);
            setTitle("");
            setURL("");
        }
        setShowInputBox(!showInputBox)
    }

    const deleteImage = async (id) => {
        await deleteDoc(doc(db, "photofolio","albums",selectedAlbum,id));
        toast.success('Image deleted successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    return(
        <div className="album-container">
            <ToastContainer></ToastContainer>
            {
                showInputBox &&
                <div className="input-container">
                    <label style={{fontSize:"20px"}}>Add image to {selectedAlbum}</label>
                    <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input placeholder="Image URL" value={url} onChange={(e) => setURL(e.target.value)} />
                    <button className="add-img" onClick={addImage}>{update ? "Update" : "Add Image"}</button>
                </div>
            }
            <div className="album-head">
                {/* <button onClick={() => updateSelectedAlbum(null)}>Back</button> */}
                <div onClick={() => updateSelectedAlbum(null)} className="back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"/></svg>
                </div>
                <h2>Images in {selectedAlbum}</h2>
                <button className={showInputBox ? "cancel-button" : "add-button"} onClick={toggleInputFields}>{showInputBox ? "Cancel" : "Add Images"}</button>
            </div>
            <div className="photos">
                {
                    images.map(image => {
                        return (
                            <div className="photo-card">
                                <div className="image-cover">
                                    <img src={image.url} alt={image.title} />
                                </div>
                                {/* <button onClick={() => updateHandler(image)}>Update</button> */}
                                {/* <button onClick={() => deleteImage(image.id)}>Delete</button> */}
                                <div className="photo-caption">
                                    <h4>{image.title}</h4>
                                    {/* <div style={{display:"flex"}}> */}
                                        <div onClick={() => updateHandler(image)} style={{height:"24px",marginLeft: "auto"}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"/></svg>
                                        </div>
                                        <div onClick={() => deleteImage(image.id)} style={{height:"24px"}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg>
                                        </div>
                                    {/* </div> */}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

}

export default Album;