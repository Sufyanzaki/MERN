import React, { useContext, useEffect, useState } from 'react'
import { images } from '../../../utils/imageParser'
import { Scrollbars } from "react-custom-scrollbars";
import { format } from 'timeago.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import Comment from '../../comment/Comment';
import "./postDetail.css"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faShare,faXmark, faImage} from '@fortawesome/pro-solid-svg-icons';
import {faSmile} from '@fortawesome/pro-light-svg-icons';
import { API, config, defaultImage } from '../../../utils/helper';
const PostDetail = ({ stateChanger, prop, parent }) => {
console.log(stateChanger, prop, parent)
    const { user } = useContext(AuthContext);

    const upp = 'https://qbox.mn/images/users/';

    const postMultipleImages = prop.images?JSON.parse(prop.images):[];

    const [commentState, setCommentState] = useState({
        comment: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCommentState((prev) => {
            return ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            })
        })
    }

    const [nComment, setNComment] = useState([]);
    console.log(nComment);
    const [coms, setComs] = useState(prop.comments?prop.comments:[])
    let commentsArray = [];
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newComment = {
            comment: commentState.comment,
            post_id: prop.id,
            user_id: user.id
        };
        try {
            await axios.post(API + 'comment/store', newComment, config(user.token)).then((response) => {
                commentsArray.splice(0, 0, response.data)
                setNComment((prev) => {
                    return ([
                        ...prev,
                        response.data
                    ])
                })
                setComs((prev) => {
                    return ([
                        ...prev,
                        ...commentsArray
                    ])
                })
                setCommentState({ comment: '' });
            })
        } catch (err) {
            console.log(err)
        }
    }

    //Foolow user
    const [unfollow, setUnfollow] = useState(prop.isFriend === true ? 'Unfollow' : 'Follow');
    const [loading, setLoading] = useState(false);
    const sendReq = () => {
        if (unfollow == 'Follow') {
            setLoading(true)
            axios.post('https://qbox.mn/api/user_can_send_a_friend_request', { recipient_id: prop.id }, config(user.token)).then(resp => setLoading(false))
            setUnfollow('UnFollow')
        }
        else {
            setLoading(true)
            axios.post('https://qbox.mn/api/user_can_remove_a_friend_request', { recipient_id: prop.id }, config(user.token)).then(resp => setLoading(false))
            setUnfollow('Follow')
        }
    }
    //likes logics
    const [liked, setLiked] = useState(prop.likes && prop.likes.some(object => object.user_id == user.id));
    const [likes, setLikes] = useState(prop.likes && prop.likes.length);

    const likehandler = () => {
        setLiked((prev) => !prev);
        if (!liked) {
            axios.post('https://qbox.mn/api/like', { likeable_type: "App\\Models\\Post", id: prop.id }, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + user.token
                }
            });
        }
        else {
            axios.delete(URL + "unlike", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                },
                data: {
                    likeable_type: "App\\Models\\Post",
                    id: prop.id,
                    _method: "DELETE"
                }
            })
        }
        liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
    }
    //fixing on enter submit
    const something = (event) => {
        if (event.keyCode === 13) {
            handleSubmit(event)
        }
    }
    //init slick slider

    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();

    return (
        <div className="modal fade show" id="img-comt" style={{ display: 'block', paddingRight: '17px' }} aria-modal="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* <!-- Modal Header --> */}
                    <div className="modal-header" onClick={() => stateChanger(false)}>
                        <button type="button" className="close" data-dismiss="modal"><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="pop-image">
                                    <div className="pop-item">
                                        <Carousel>
                                            {postMultipleImages.map(p=>{
                                                return(
                                                    <figure>
                                                        <img src={prop.user && upp+ prop.user_id + '/' + p} alt="Single Post image" />
                                                    </figure>
                                                )
                                            })}
                                        </Carousel>
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-4">
                                <div className="user">
                                    <figure><img src={prop.user && (prop.user.photo === null ? defaultImage : upp + `${prop.user.id}/` +prop.user.photo)} alt="" /></figure>
                                    <div className="user-information">
                                        <h4><a href="#" title="">{prop.user && prop.user.name}</a></h4>
                                        <span>{format(prop.created_at)}</span>
                                    </div>
                                    <a href="#" title="Follow" data-ripple="" onClick={sendReq}>{unfollow}</a>
                                </div>
                                <div className="we-video-info">
                                    <ul>
                                        <li>
                                            <div title="Like/Dislike" className="likes heart" onClick={likehandler}>❤<span>{likes}</span></div>
                                        </li>
                                        <li>
                                            <span title="Comments" className="comment">
                                                <FontAwesomeIcon icon={faComment}/>
                                                <ins>{prop.comments && prop.comments.length}</ins>
                                            </span>
                                        </li>

                                        <li>
                                            <span>
                                                <a title="Share" href="#" className="">
                                                    <FontAwesomeIcon icon={faShare}/>
                                                </a>
                                                <ins>20</ins>
                                            </span>
                                        </li>
                                    </ul>
                                    <div className="users-thumb-list">
                                        <a href="#" title="" data-toggle="tooltip" data-original-title="Anderw">
                                            <LazyLoadImage alt="" src={images['userlist-1.jpg']} />
                                        </a>
                                        <a href="#" title="" data-toggle="tooltip" data-original-title="frank">
                                            <LazyLoadImage alt="" src={images['userlist-4.jpg']} />
                                        </a>
                                        <a href="#" title="" data-toggle="tooltip" data-original-title="Sara">
                                            <LazyLoadImage alt="" src={images['userlist-3.jpg']} />
                                        </a>
                                        <a href="#" title="" data-toggle="tooltip" data-original-title="Amy">
                                            <LazyLoadImage alt="" src={images['userlist-4.jpg']} />
                                        </a>
                                        <span><strong>You</strong>, <b>Sarah</b> and <a title="" href="#">24+ more</a>
                                            liked</span>
                                    </div>
                                </div>
                                <div style={{ display: 'block' }} className="coment-area">
                                    <Scrollbars style={{ width: '100%', height: '60vh' }}>
                                        <ul className="we-comet">

                                            {coms.map((c) => {
                                                return (<li>
                                                    {/* <div className="comet-avatar">
                                                    <Link to={`/${slugify(c.user.username)}`}>
                                                        <img src={c.user.photo === null ? 'https://www.smartlook.com/wp-content/uploads/2021/12/avatar_male_01.png' : upp + c.user.photo} alt="" />
                                                    </Link>
                                                    </div>
                                                    <div className="we-comment">
                                                        <h5><Link to={`/${slugify(c.user.username)}`}>{c.user.name}</Link></h5>
                                                        <p>{c.comment}</p>
                                                        <div className="inline-itms">
                                                            <span>{format(c.created_at)}</span>
                                                            <a title="Reply" href="#" className="we-reply"><i className="fa fa-reply"></i></a>
                                                            <a title="" href="#"><i className="fa fa-heart"></i><span>20</span></a>
                                                        </div>
                                                    </div> */}
                                                    <Comment key={c.id} comment={c} postid={prop.id} />
                                                </li>)
                                            })}
                                            {/* <li>
                                            <a className="showmore underline" title="" href="#">more comments+</a>
                                        </li> */}
                                            <li className="post-comment">
                                                <div className="comet-avatar">
                                                    <img alt="" src={prop.user && prop.user.photo?upp+`${prop.user.id}/`+prop.user.photo:defaultImage}/>
                                                </div>
                                                <div className="post-comt-box">
                                                    <form method="post" onSubmit={handleSubmit} >
                                                        <textarea placeholder="Post your comment" name='comment' onChange={handleChange} onKeyDown={(e) => something(e)} value={commentState.comment} ></textarea>
                                                        <div className="add-smiles">
                                                            <div className="uploadimage">
                                                            <FontAwesomeIcon icon={faImage}/>

                                                                <label className="fileContainer">
                                                                    <input type="file" />
                                                                </label>
                                                            </div>
                                                            <span title="add icon" className="em em-expressionless">
                                                                <FontAwesomeIcon icon={faSmile}/>
                                                            </span>
                                                        </div>
                                                    </form>
                                                </div>
                                            </li>
                                        </ul>
                                    </Scrollbars>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default PostDetail;