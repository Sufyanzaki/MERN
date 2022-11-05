import React from 'react'
import { images } from '../../../utils/imageParser'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import Comment from '../comment/Comment';
import "./postDetail.css"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
const PostDetail = () => {

    return (
        <div className="modal fade show" id="img-comt" style={{ display: 'block', paddingRight: '17px' }} aria-modal="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* <!-- Modal Header --> */}
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">×</button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="pop-image">
                                    <div className="pop-item">
                                        <Carousel>
                                            <figure>
                                                <img src='' alt="" />
                                            </figure>
                                        </Carousel>
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-4">
                                <div className="user">
                                    <figure><img src='' alt="" /></figure>
                                    <div className="user-information">
                                        <h4><a href="https://google.com" title="">name</a></h4>
                                        <span>10.10.10</span>
                                    </div>
                                    <a href="https://google.com" title="Follow" data-ripple="">unfollow</a>
                                </div>
                                <div className="we-video-info">
                                    <ul>
                                        <li>
                                            <div title="Like/Dislike" className="likes heart">❤<span>likes</span></div>
                                        </li>
                                        <li>
                                            <span title="Comments" className="comment">
                                                <i className="fa fa-commenting"></i>
                                                <ins>length</ins>
                                            </span>
                                        </li>

                                        <li>
                                            <span>
                                                <a title="Share" href="https://google.com" className="">
                                                    <i className="fa fa-share-alt"></i>
                                                </a>
                                                <ins>20</ins>
                                            </span>
                                        </li>
                                    </ul>
                                    <div className="users-thumb-list">
                                        <a href="https://google.com" title="" data-toggle="tooltip" data-original-title="Anderw">
                                            <img alt="" src={images['userlist-1.jpg']} />
                                        </a>
                                        <a href="https://google.com" title="" data-toggle="tooltip" data-original-title="frank">
                                            <img alt="" src={images['userlist-4.jpg']} />
                                        </a>
                                        <a href="https://google.com" title="" data-toggle="tooltip" data-original-title="Sara">
                                            <img alt="" src={images['userlist-3.jpg']} />
                                        </a>
                                        <a href="https://google.com" title="" data-toggle="tooltip" data-original-title="Amy">
                                            <img alt="" src={images['userlist-4.jpg']} />
                                        </a>
                                        <span><strong>You</strong>, <b>Sarah</b> and <a title="" href="https://google.com">24+ more</a>
                                            liked</span>
                                    </div>
                                </div>
                                <div style={{ display: 'block' }} className="coment-area">
                                    <SimpleBar style={{ maxHeight: 300 }}>
                                        <ul className="we-comet">

                                            <li>
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
                                                            <a title="Reply" href="https://google.com" className="we-reply"><i className="fa fa-reply"></i></a>
                                                            <a title="" href="https://google.com"><i className="fa fa-heart"></i><span>20</span></a>
                                                        </div>
                                                    </div> */}
                                                <Comment/>
                                            </li>
                                            {/* <li>
                                            <a className="showmore underline" title="" href="https://google.com">more comments+</a>
                                        </li> */}
                                            <li className="post-comment">
                                                <div className="comet-avatar">
                                                    <img alt="" src={images['nearly1.jpg']} />
                                                </div>
                                                <div className="post-comt-box">
                                                    <form method="post" >
                                                        <textarea placeholder="Post your comment" name='comment'></textarea>
                                                        <div className="add-smiles">
                                                            <div className="uploadimage">
                                                                <i className="fa fa-image"></i>
                                                                <label className="fileContainer">
                                                                    <input type="file" />
                                                                </label>
                                                            </div>
                                                            <span title="add icon" className="em em-expressionless"></span>
                                                            <div className="smiles-bunch">
                                                                <i className="em em---1"></i>
                                                                <i className="em em-smiley"></i>
                                                                <i className="em em-anguished"></i>
                                                                <i className="em em-laughing"></i>
                                                                <i className="em em-angry"></i>
                                                                <i className="em em-astonished"></i>
                                                                <i className="em em-blush"></i>
                                                                <i className="em em-disappointed"></i>
                                                                <i className="em em-worried"></i>
                                                                <i className="em em-kissing_heart"></i>
                                                                <i className="em em-rage"></i>
                                                                <i className="em em-stuck_out_tongue"></i>
                                                            </div>
                                                        </div>
                                                        <button type="submit">Post Comment</button>
                                                    </form>
                                                </div>
                                            </li>
                                        </ul>
                                    </SimpleBar>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default PostDetail;