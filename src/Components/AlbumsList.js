import React, { useEffect, useState } from 'react';
import { getDoc, doc, setDoc  } from "firebase/firestore"; 
import { ToastContainer,Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {db} from "../firebaseinit.js";

const AlbumsList = ({updateSelectedAlbum}) => {
    const [showInputBox,setShowInputBox] = useState(false);
    const [albumName,setAlbumName] = useState("");
    const [albums,setAlbums] = useState([]);

    useEffect(() => {

        const fetchAlbums = async () => {
            const docRef = doc(db, "photofolio","albumNames");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                const {albums} = docSnap.data();
                setAlbums(albums);
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }

        }

        fetchAlbums();

    },[])

    const handleSubmit = async () => {
        if(!albumName) {
            return;
        }
        // console.log(albumName);
        let temp = albums;
        temp.push(albumName);
        setAlbums(temp);
        
        const docRef = await setDoc(doc(db, "photofolio","albumNames"), {
            albums:temp
        });
        console.log("Document written with ID: ", docRef);

        toast.success('Album added successfully', {
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

        setAlbumName("");
    }

    return (
        <div className='album-container'>
            <ToastContainer></ToastContainer>
            {
                showInputBox && 
                <div className='input-container'>
                    <label style={{fontSize:"20px"}}>Create an Album</label>
                    <input type="text" placeholder="Album Name" onChange={(e) => setAlbumName(e.target.value)} />
                    <button className='add-img' onClick={() => handleSubmit()} >Create</button>
                </div>
            }
            <div className='album-head'>
                <h2>Your Albums</h2>
                <button className={showInputBox ? "cancel-button" : "add-button"} onClick={() => setShowInputBox(!showInputBox)}>{showInputBox ? "Cancel" : "Add Album"}</button>
            </div>
            <div className='albums'>
                {
                    albums.map(album => {
                    return (
                        <div onClick={() => updateSelectedAlbum(album)} className='album-card' key={album}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.85"><rect width="30" height="30" x="6" y="6" rx="2"/><path stroke-linecap="round" d="M42 12v27a3 3 0 0 1-3 3H12M6 25l7.656-6.806a2 2 0 0 1 2.674.015L26 27"/><path stroke-linecap="round" d="m22 23l4.785-3.988a2 2 0 0 1 2.48-.063L36 24M6 19v8m30-8v8"/></g></svg>
                            <p style={{margin:"0 0 4px"}}>{album}</p>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AlbumsList;
