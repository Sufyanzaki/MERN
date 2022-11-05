import React from 'react'
import { useState } from "react";
import "./CreatePost.css"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseURI } from '../../../utils/helper';
import useLocalStorage from '../../../utils/useLocalStorage';
import { useSelector } from 'react-redux';
import Spinner from '../../Layouts/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// import '../../multiPreview/MultiPreview.css';

const CreatePost = ({ getPosts }) => {

    const { socket } = useSelector(state => state.socket)

    const [local,] = useLocalStorage('user');
    const [selectedImage, setSelectedImage] = useState();
    const [videoFile, setVideoFile] = useState();

    const [form, setForm] = useState({
        caption: ''
    })

    const [loading, setloading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => {
            return ({
                ...prev,
                [name]: value
            })
        })
    }
    const notify = (message) => { toast(message); };
    const submitHandler = async (e) => {
        e.preventDefault();
        setloading(true)
        setForm({ caption: '' })
        const myForm = new FormData();
        if (selectedImage && selectedImage.length > 0) {
            Array.from(selectedImage).forEach(s=>{
                const fileName = Date.now() + s.name;
                myForm.append("name", fileName);
                myForm.append("file", s);
            })
            myForm.append("upload_preset", "MERN SOCKET")
            myForm.append("cloud_name", "dkfy6dxrg")
        }
        if (videoFile) {
            const fileName = Date.now() + videoFile.name;
            myForm.append("name", fileName);
            myForm.append("file", videoFile);
            myForm.append("upload_preset", "MERN SOCKET")
            myForm.append("cloud_name", "dkfy6dxrg")
        }
        myForm.append("caption", form.caption)

        axios.post(`${baseURI}post/upload`, myForm, { withCredentials: true })
            .then(res => {
                getPosts(res.data.post)
                if (!socket) return;
                socket.emit('new-post', res.data.post)
                setSelectedImage()
                setVideoFile();
                setloading(false)
            })
            .catch(err => notify(err))
    };

    //logic for images preview
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files);
        }
    };
    const removeSelectedImage = () => {
        setSelectedImage();
    };
    const videoChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setVideoFile(e.target.files[0]);
        }
    };
    const removeSelectedVideo = () => {
        setVideoFile();
    };

    return (
        <>
            <ToastContainer />
            <div className="central-meta postbox">
                <span className="create-post">Create post</span>
                <div className="new-postbox">
                    <figure>
                        <Link to={`/`}>
                            <img src={local.pic} alt="" />
                        </Link>
                    </figure>
                    <div className="newpst-input">
                        <form method="post" onSubmit={submitHandler}>
                            <textarea rows="2" name='caption' value={form.caption}
                                onKeyDown={(e) => (e.code === 'Enter' ? submitHandler(e) : null)} placeholder={"What's in your mind ?"} onChange={handleChange}></textarea>
                            <div className="attachments">
                                <ul>
                                    {/* <li>
                            <span className="add-loc">
                                <i className="fa fa-map-marker"></i>
                            </span>
                        </li>
                        <li>
                            <i className="fa fa-music"></i>
                            <label className="fileContainer">
                                <input type="file" />
                            </label>
                        </li> */}
                                    <li>
                                        {/* ------------------------------------------------------------------- */}
                                        <div className="form-group">
                                            <i><svg width='18px' viewBox="0 0 512 512"><path d="M152 120c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48S178.5 120 152 120zM447.1 32h-384C28.65 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM463.1 409.3l-136.8-185.9C323.8 218.8 318.1 216 312 216c-6.113 0-11.82 2.768-15.21 7.379l-106.6 144.1l-37.09-46.1c-3.441-4.279-8.934-6.809-14.77-6.809c-5.842 0-11.33 2.529-14.78 6.809l-75.52 93.81c0-.0293 0 .0293 0 0L47.99 96c0-8.822 7.178-16 16-16h384c8.822 0 16 7.178 16 16V409.3z" /></svg></i>
                                            <label className="fileContainer" htmlFor='file'>
                                                <input
                                                    id="file"
                                                    accept=".png,.jpeg,.jpg"
                                                    type="file"
                                                    className="form-control"
                                                    onChange={imageChange}
                                                    multiple
                                                />
                                            </label>
                                        </div>
                                        <div className='form-group'>
                                            <i><svg width='20px' viewBox="0 0 576 512"><path d="M557.6 102.3c-11.53-7.406-25.88-8.391-38.28-2.688L416 147V128c0-35.35-28.65-64-64-64H64C28.65 64 0 92.65 0 128v256c0 35.35 28.65 64 64 64h288c35.35 0 64-28.65 64-64v-19.02l103.3 47.36c5.344 2.453 11.03 3.672 16.69 3.672c7.531 0 15.02-2.141 21.59-6.359C569.1 402.3 576 389.7 576 375.1V136C576 122.3 569.1 109.8 557.6 102.3zM368 384c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V128c0-8.822 7.178-16 16-16h288c8.822 0 16 7.178 16 16V384zM528 363.5L416 312.2V199.8l112-51.33V363.5z" /></svg></i>
                                            <label className="fileContainer" htmlFor='file'>
                                                <input
                                                    id="file"
                                                    accept=".mp4"
                                                    type="file"
                                                    className="form-control"
                                                    onChange={videoChange}
                                                />
                                            </label>
                                        </div>
                                        {selectedImage && Array.from(selectedImage).map((s, index) => {
                                            return <div key={index}>
                                                <img
                                                    src={URL.createObjectURL(s)}
                                                    alt="Thumb"
                                                />
                                                <button onClick={removeSelectedImage}>
                                                    Remove This Image
                                                </button>
                                            </div>
                                        })}
                                        {videoFile && (
                                            <div>
                                                <video width="200" controls>
                                                    <source src={URL.createObjectURL(videoFile)} />
                                                </video>
                                                <button onClick={removeSelectedVideo}>
                                                    Remove This video
                                                </button>
                                            </div>
                                        )}


                                        {/* <div className="form-group preview">
                                            <div key={1} className="multi-box">
                                                <img src='' alt="" />
                                            </div>
                                        </div> */}
                                        {/* ------------------------------------------------------------------- */}
                                    </li>
                                    {/* <li>
                                    <i className="fa fa-video-camera"></i>
                                    <label className="fileContainer">
                                        <input type="file" />
                                    </label>
                                </li>
                                <li>
                                    <i className="fa fa-camera"></i>
                                    <label className="fileContainer">
                                        <input type="file" />
                                    </label>
                                </li> */}
                                </ul>
                                {loading ? <Spinner /> : <button className="post-btn" type="submit" data-ripple="">Post</button>}
                            </div>
                        </form>
                    </div>
                </div>
                {false && <div className='error_handler bg-red'>
                    This message with show only when errors will exist
                </div>}
            </div>
        </>
    )
}

export default CreatePost