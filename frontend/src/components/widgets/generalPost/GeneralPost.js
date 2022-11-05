import React, { useEffect, useState } from 'react'
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import "./GeneralPost.css"
import Comment from '../comment/Comment';
import { Link } from 'react-router-dom';
import { baseURI } from '../../../utils/helper';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useLocalStorage from '../../../utils/useLocalStorage';
// import PostDetail from '../postDetail/postDetail';

export default function GeneralPost({ getPosts, post }) {
    const [local,] = useLocalStorage('user');
    const { socket } = useSelector(state => state.socket);
    const { user } = useSelector(state => state.user)
    const [coms, setComs] = useState(null);
    const [comsCollection, setComsCollection] = useState([]);
    const [liked, setLiked] = useState(post.likes.includes(local._id));
    const [likes, setLikes] = useState(post.likes.length)

    const likeHandler = (e, id) => {
        e.preventDefault();
        setLiked(!liked)
        axios.get(`${baseURI}post/${id}`, {withCredentials:true})
        .then((res)=>{liked?setLikes(prev=> prev-1) : setLikes(prev=>prev+1);
            socket.emit('new-like', {likes,liked,id})})
        .catch(err=>console.log(err));
    };

    const submitComment = (e, id) => {
        e.preventDefault();
        axios.put(`${baseURI}post/comment/${id}`, { comment: coms }, { withCredentials: true })
            .then(res => {
                setComsCollection([...comsCollection, res.data.response]);
                socket.emit('new-comment', res.data.response)
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if (!socket) return;
        socket.on('post-recieved', (data => getPosts(data)));
        socket.on('comment-recieved', (data => setComsCollection([...comsCollection, data])));
        socket.on('like-recieved', ((data) => {setLikes(data.likes);
        }))
    })



    return (
        <>
            <div className="central-meta item" key={post._id} style={{ display: 'inline-block' }} id=''>
                <div className="user-post" >
                    <div className="friend-info">
                        <figure>
                            <Link to={`/`}>
                                <img src={post.owner.pic} alt="" />
                            </Link>
                        </figure>
                        <div className="friend-name">
                            <div className="more">
                                <div className="more-post-optns"><i><svg viewBox="0 0 512 512"><path d="M400 256c0 26.5 21.5 48 48 48s48-21.5 48-48S474.5 208 448 208S400 229.5 400 256zM112 256c0-26.5-21.5-48-48-48S16 229.5 16 256S37.5 304 64 304S112 282.5 112 256zM304 256c0-26.5-21.5-48-48-48S208 229.5 208 256S229.5 304 256 304S304 282.5 304 256z" /></svg></i>
                                    <ul>
                                        {
                                            (() => {
                                                if (true) {
                                                    return (
                                                        <>
                                                            <li><i><svg viewBox="0 0 512 512"><path d="M495.6 49.23l-32.82-32.82C451.8 5.471 437.5 0 423.1 0c-14.33 0-28.66 5.469-39.6 16.41L167.5 232.5C159.1 240 154.8 249.5 152.4 259.8L128.3 367.2C126.5 376.1 133.4 384 141.1 384c.916 0 1.852-.0918 2.797-.2813c0 0 74.03-15.71 107.4-23.56c10.1-2.377 19.13-7.459 26.46-14.79l217-217C517.5 106.5 517.4 71.1 495.6 49.23zM461.7 94.4L244.7 311.4C243.6 312.5 242.5 313.1 241.2 313.4c-13.7 3.227-34.65 7.857-54.3 12.14l12.41-55.2C199.6 268.9 200.3 267.5 201.4 266.5l216.1-216.1C419.4 48.41 421.6 48 423.1 48s3.715 .4062 5.65 2.342l32.82 32.83C464.8 86.34 464.8 91.27 461.7 94.4zM424 288c-13.25 0-24 10.75-24 24v128c0 13.23-10.78 24-24 24h-304c-13.22 0-24-10.77-24-24v-304c0-13.23 10.78-24 24-24h144c13.25 0 24-10.75 24-24S229.3 64 216 64L71.1 63.99C32.31 63.99 0 96.29 0 135.1v304C0 479.7 32.31 512 71.1 512h303.1c39.69 0 71.1-32.3 71.1-72L448 312C448 298.8 437.3 288 424 288z" /></svg></i>Edit Post</li>
                                                            <li ><i className=""><svg viewBox="0 0 448 512"><path d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z" /></svg></i>Delete Post</li>
                                                            <li className="bad-report"><i><svg viewBox="0 0 512 512"><path d="M476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87c-34.63 0-77.87 8.003-137.2 32.05V24C48 10.75 37.25 0 24 0S0 10.75 0 24v464C0 501.3 10.75 512 24 512s24-10.75 24-24v-104c53.59-23.86 96.02-31.81 132.8-31.81c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0zM464 319.8c-30.31 10.82-58.08 16.1-84.6 16.1c-30.8 0-58.31-7-87.44-14.41c-32.01-8.141-68.29-17.37-111.1-17.37c-42.35 0-85.99 9.09-132.8 27.73V84.14l18.03-7.301c47.39-19.2 86.38-28.54 119.2-28.54c28.24 .0039 49.12 6.711 73.31 14.48c25.38 8.148 54.13 17.39 90.58 17.39c35.43 0 72.24-8.496 114.9-26.61V319.8z" /></svg></i>Report Post</li>
                                                            <li><i><svg viewBox="0 0 576 512"><path d="M208 256c35.35 0 64-28.65 64-64c0-35.35-28.65-64-64-64s-64 28.65-64 64C144 227.3 172.7 256 208 256zM464 232h-96c-13.25 0-24 10.75-24 24s10.75 24 24 24h96c13.25 0 24-10.75 24-24S477.3 232 464 232zM240 288h-64C131.8 288 96 323.8 96 368C96 376.8 103.2 384 112 384h192c8.836 0 16-7.164 16-16C320 323.8 284.2 288 240 288zM464 152h-96c-13.25 0-24 10.75-24 24s10.75 24 24 24h96c13.25 0 24-10.75 24-24S477.3 152 464 152zM512 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V96C576 60.65 547.3 32 512 32zM528 416c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V96c0-8.822 7.178-16 16-16h448c8.822 0 16 7.178 16 16V416z" /></svg></i>Boost This Post</li>
                                                            <li><i><svg viewBox="0 0 512 512"><path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z" /></svg></i>Schedule Post</li>
                                                            <li><i><svg viewBox="0 0 576 512"><path d="M358.1 143.5L243.6 195.8c-5.957 2.723-13.06 9.824-15.78 15.78l-52.33 114.5c-12.32 26.95 15.45 54.72 42.4 42.41l114.5-52.32c5.939-2.715 13.03-9.817 15.75-15.76l52.34-114.5C412.8 158.1 385 131.2 358.1 143.5zM310.6 278.6c-12.5 12.5-32.75 12.5-45.25 0c-12.5-12.5-12.5-32.75 0-45.25c12.5-12.5 32.75-12.5 45.25 0C323.1 245.9 323.1 266.1 310.6 278.6zM288 0C146.6 0 32 114.6 32 256s114.6 256 256 256s256-114.6 256-256S429.4 0 288 0zM288 464c-114.7 0-208-93.31-208-208S173.3 48 288 48s208 93.31 208 208S402.7 464 288 464z" /></svg></i>Select as featured</li>
                                                        </>
                                                    )
                                                }
                                            })()
                                        }
                                        <li><i><svg viewBox="0 0 640 512"><path d="M183.6 118.6C206.5 82.58 244.1 56.84 288 49.88V32C288 14.33 302.3 .0003 320 .0003C337.7 .0003 352 14.33 352 32V49.88C424.5 61.39 480 124.2 480 200V233.4C480 278.8 495.5 322.9 523.8 358.4L538.7 377C543.1 383.5 545.4 392.2 542.6 400L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L183.6 118.6zM221.7 148.4L450.7 327.1C438.4 298.2 432 266.1 432 233.4V200C432 142.6 385.4 96 328 96H312C273.3 96 239.6 117.1 221.7 148.4V148.4zM160 233.4V222.1L206.7 258.9C202.7 297.7 189.5 335.2 168.3 368H345.2L406.2 416H120C110.8 416 102.4 410.7 98.37 402.4C94.37 394.1 95.5 384.2 101.3 377L116.2 358.4C144.5 322.9 160 278.8 160 233.4V233.4zM384 448C384 464.1 377.3 481.3 365.3 493.3C353.3 505.3 336.1 512 320 512C303 512 286.7 505.3 274.7 493.3C262.7 481.3 256 464.1 256 448H384z" /></svg></i>Turn off Notifications</li>
                                    </ul>
                                </div>
                            </div>
                            <ins>
                                <Link to={`/`}>{post.owner.name}</Link> Post
                                Album</ins>
                            <span><i><svg viewBox="0 0 512 512"><path d="M256 16C123.5 16 16 123.5 16 256s107.5 240 240 240s239.1-107.5 239.1-240S388.5 16 256 16zM422 160H373.3c-6.391-27.41-15.39-52.18-26.48-73.1C378.2 103.8 404.2 129.2 422 160zM336 256c0 16.98-1.295 32.82-3.176 48H179.2C177.3 288.8 176 272.1 176 256s1.295-32.82 3.176-48h153.6C334.7 223.2 336 239 336 256zM256 448c-21.79 0-50.87-36.42-67.28-96h134.6C306.9 411.6 277.8 448 256 448zM188.7 160C205.1 100.4 234.2 64 256 64s50.87 36.42 67.28 96H188.7zM165.2 86.9C154.1 107.8 145.1 132.6 138.7 160H89.98C107.8 129.2 133.8 103.8 165.2 86.9zM70.32 208h60.25C128.9 223.5 128 239.6 128 256S128.9 288.5 130.6 304H70.32C66.34 288.6 64 272.6 64 256S66.34 223.4 70.32 208zM89.98 352H138.7c6.391 27.41 15.39 52.18 26.48 73.1C133.8 408.2 107.8 382.8 89.98 352zM346.8 425.1C357.9 404.2 366.9 379.4 373.3 352h48.74C404.2 382.8 378.2 408.2 346.8 425.1zM441.7 304h-60.25c1.68-15.51 2.57-31.56 2.57-48s-.8907-32.49-2.57-48h60.25C445.7 223.4 448 239.4 448 256S445.7 288.6 441.7 304z" /></svg></i> published: created_at
                            </span>
                        </div>
                        <div className="post-meta">
                            <p>{post.caption}</p>
                            {(() => {

                                if (post.image && post.image.length > 0) {
                                    return (
                                        <>
                                            <figure>
                                                <img src={post.image} alt="" />
                                            </figure>
                                        </>
                                    )
                                } else if (false) {
                                    return (
                                        <>
                                            <div className="img-bunch">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                                        <figure><img src='' alt="" /></figure>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                } else if (false) {
                                    return (
                                        <>
                                            <div className="img-bunch">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                                        <figure><img src='' alt="" /></figure>
                                                        <figure><img src='' alt="" /></figure>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                                        <figure><img src='' alt="" /></figure>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                } else if (false) {
                                    return (
                                        <>
                                            <div className="img-bunch">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                                        <figure><img src='' alt="" /></figure>
                                                        <figure><img src='' alt="" /></figure>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                                        <figure><img src='' alt="" /></figure>
                                                        <figure><img src='' alt="" /></figure>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                } else if (false) {
                                    return (
                                        <>
                                            <div className="img-bunch">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                                        <figure><img src='' alt="" /></figure>
                                                        <figure><img src='' alt="" /></figure>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                                        <figure><img src='' alt="" /></figure>
                                                        <figure><img src='' alt="" /></figure>
                                                        <figure><img src='' alt="" /></figure>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                } else if (false) {
                                    return (
                                        <>
                                            <div className="img-bunch">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                                        <figure><img src='' alt="" /></figure>
                                                        <figure><img src='' alt="" /></figure>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                                        <figure><img src='' alt="" /></figure>
                                                        <figure><img src='' alt="" /></figure>
                                                        <figure><img src='' alt="" />
                                                            <div className="more-photos">
                                                                <span>+1</span>
                                                            </div></figure>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                                else if (post.video) {
                                    return (
                                        <>
                                            <figure>
                                                <video width="100%" controls>
                                                    <source src={post.video} />
                                                </video>
                                            </figure>

                                        </>
                                    )
                                }
                                else {
                                    return <span></span>
                                }

                            })()}

                            {false &&
                                <LinkPreview url='' width="100%" />}
                            <div className="we-video-info">
                                <ul>
                                    <li>
                                        <span className="views" title="views">
                                            <i><svg viewBox="0 0 640 512"><path d="M468 32c-62.9 0-117.9 44.34-147.9 110.1c-10.8-23.89-24.89-45.37-42.23-62.99C247.5 48.31 210.9 32 172 32C77.16 32 0 132.5 0 256s77.16 224 172 224c62.1 0 118-44.48 148-110.4C349.1 435.5 405 480 468 480C562.8 480 640 379.5 640 256S562.8 32 468 32zM172 432c-45.95 0-86.05-35.75-107.5-88.59C73.86 348.7 84.5 352 96 352c35.35 0 64-28.65 64-64S131.3 224 96 224C76.98 224 60.09 232.5 48.37 245.6C52.19 153.4 106.1 80 172 80c25.75 0 50.53 11.34 71.72 32.84C276.4 146.1 296 199.6 296 256C296 353 240.4 432 172 432zM468 432c-44.59 0-83.64-33.7-105.5-83.97C369.3 350.4 376.4 352 384 352c35.35 0 64-28.65 64-64s-28.65-64-64-64c-14.91 0-28.46 5.312-39.34 13.87C351.1 149.3 403.9 80 468 80C536.4 80 592 158.1 592 256S536.4 432 468 432z" /></svg></i>
                                            <ins>1</ins>
                                        </span>
                                    </li>
                                    <li>
                                        {
                                            <div className={`heart ${liked ? 'happy' : 'broken'}`} onClick={(e)=>likeHandler(e, post._id)} title="Unlike"><i><svg viewBox="0 0 512 512"><path d="M462.1 62.86C438.8 41.92 408.9 31.1 378.7 32c-37.49 0-75.33 15.4-103 43.98l-19.7 20.27l-19.7-20.27C208.6 47.4 170.8 32 133.3 32C103.1 32 73.23 41.93 49.04 62.86c-62.14 53.79-65.25 149.7-9.23 207.6l193.2 199.7C239.4 476.7 247.6 480 255.9 480c8.332 0 16.69-3.267 23.01-9.804l193.1-199.7C528.2 212.5 525.1 116.6 462.1 62.86zM437.6 237.1l-181.6 187.8L74.34 237.1C42.1 203.8 34.46 138.1 80.46 99.15c39.9-34.54 94.59-17.5 121.4 10.17l54.17 55.92l54.16-55.92c26.42-27.27 81.26-44.89 121.4-10.17C477.1 138.6 470.5 203.1 437.6 237.1z" /></svg></i>
                                                <span>{likes}</span>
                                            </div>
                                        }
                                    </li>

                                    <li>
                                        <span className="comment" title="Comments">
                                            <i><svg viewBox="0 0 512 512"><path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z" /></svg></i>
                                            <ins>10 coms</ins>
                                        </span>
                                    </li>

                                    <li>
                                        <span>
                                            <a className="share-pst" href="https://google.com" title="Share">
                                                <i><svg viewBox="0 0 512 512"><path d="M152 184h271.5l-127.2-109.8c-10.03-8.656-11.12-23.81-2.469-33.84c8.688-10.06 23.85-11.21 33.85-2.487l176 151.1C508.1 194.4 512 201 512 208c0 6.968-3.029 13.58-8.31 18.14l-176 151.1c-4.531 3.937-10.13 5.847-15.69 5.847c-6.719 0-13.41-2.812-18.16-8.312c-8.656-10.03-7.562-25.19 2.469-33.84l127.2-109.8H152c-57.34 0-104 46.65-104 103.1v119.1C48 469.3 37.25 480 24 480S0 469.3 0 456v-119.1C0 252.2 68.19 184 152 184z" /></svg></i>
                                            </a>
                                            <ins>20</ins>
                                        </span>
                                    </li>
                                </ul>
                                <div className="users-thumb-list">

                                </div>
                            </div>
                        </div>
                        <div className="coment-area">
                            <ul className="we-comet">
                                {post.comments && post.comments.map(c => {
                                    return <Comment key={c._id} props={c} />
                                })}
                                {comsCollection.length > 0 && comsCollection.map(c => {
                                    if (c.post === post._id) return <Comment key={c._id} props={c} />
                                })}
                                <li>
                                    <a href="https://google.com" title="" className="showmore underline">more
                                        comments+</a>
                                </li>                                <li className="post-comment">
                                    <div className="comet-avatar">
                                        <img src={user && user.pic} alt="" />
                                    </div>
                                    <div className="post-comt-box">
                                        <form onSubmit={(e) => { submitComment(e, post._id) }}>
                                            <textarea placeholder="Post your comment" name='comment' onChange={(e) => {
                                                setComs(e.target.value)
                                            }}></textarea>
                                            <button>submit</button>
                                            <div className="uploadimage">
                                                <i><svg viewBox="0 0 512 512"><path d="M152 120c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48S178.5 120 152 120zM447.1 32h-384C28.65 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM463.1 409.3l-136.8-185.9C323.8 218.8 318.1 216 312 216c-6.113 0-11.82 2.768-15.21 7.379l-106.6 144.1l-37.09-46.1c-3.441-4.279-8.934-6.809-14.77-6.809c-5.842 0-11.33 2.529-14.78 6.809l-75.52 93.81c0-.0293 0 .0293 0 0L47.99 96c0-8.822 7.178-16 16-16h384c8.822 0 16 7.178 16 16V409.3z" /></svg></i>
                                                <label className="fileContainer">
                                                    <input type="file" />
                                                </label>
                                            </div>
                                        </form>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* {isActive && <PostDetail stateChanger={setIsActive} prop={postDetails} parent={myParent} />} */}
        </>
    )
}
