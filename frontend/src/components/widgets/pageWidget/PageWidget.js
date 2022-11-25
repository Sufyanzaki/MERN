import React from 'react'
import { useSelector } from 'react-redux'
import { images } from '../../../utils/imageParser'
import "./PageWidget.css"
const PageWidget = () => {

    const {user} = useSelector(state=>state.user)

    return (
        <>
            <div className="widget">
                <h4 className="widget-title">Your page</h4>
                <div className="your-page">
                    <figure>
                        <a href='https://google.com' title=""><img src={user && user.pic} alt="" /></a>
                    </figure>
                    <div className="page-meta">
                        <a href='https://google.com' title="" className="underline">My Creative Page</a>
                        <span><i className="ti-comment"></i><a href="insight.html" title="">Messages <em>9</em></a></span>
                        <span><i className="ti-bell"></i><a href="insight.html" title="">Notifications <em>2</em></a></span>
                    </div>
                    <ul className="page-publishes">
                        <li>
                            <span><i className="fa-light fa-pen-to-square"></i>Publish</span>
                        </li>
                        <li>
                            <span><i className="fa-light fa-camera-retro"></i>Photo</span>
                        </li>
                        <li>
                            <span><i className="fa-light fa-camera-security"></i>Live</span>
                        </li>
                        <li>
                            <span><i className="fa-light fa-user-plus"></i>Invite</span>
                        </li>
                    </ul>
                    <div className="page-likes">
                        <ul className="nav nav-tabs likes-btn">
                            <li className="nav-item"><a className="active" href="#link1" data-toggle="tab" data-ripple="">likes</a></li>
                            <li className="nav-item"><a className="" href="#link2" data-toggle="tab" data-ripple="">views</a></li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active fade show" id="link1">
                                <span><i className="ti-heart"></i>884</span>
                                <a href='https://google.com' title="weekly-likes">35 new likes this week</a>
                                <div className="users-thumb-list">
                                    <a href='https://google.com' title="" data-toggle="tooltip" data-original-title="Anderw">
                                        <img src={images['userlist-1.jpg']} alt="" />
                                    </a>
                                    <a href='https://google.com' title="" data-toggle="tooltip" data-original-title="frank">
                                    <img src={images['userlist-1.jpg']} alt="" />
                                    </a>
                                    <a href='https://google.com' title="" data-toggle="tooltip" data-original-title="Sara">
                                    <img src={images['userlist-1.jpg']} alt="" />
                                    </a>
                                    <a href='https://google.com' title="" data-toggle="tooltip" data-original-title="Amy">
                                    <img src={images['userlist-1.jpg']} alt="" />
                                    </a>
                                    <a href='https://google.com' title="" data-toggle="tooltip" data-original-title="Ema">
                                    <img src={images['userlist-1.jpg']} alt="" />
                                    </a>
                                    <a href='https://google.com' title="" data-toggle="tooltip" data-original-title="Sophie">
                                    <img src={images['userlist-1.jpg']} alt="" />
                                    </a>
                                    <a href='https://google.com' title="" data-toggle="tooltip" data-original-title="Maria">
                                    <img src={images['userlist-1.jpg']} alt="" />
                                    </a>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="link2">
                                <span><i className="fa fa-eye"></i>440</span>
                                <a href='https://google.com' title="weekly-likes">440 new views this week</a>
                                <div className="users-thumb-list">
                                    <a href='https://google.com' title="" data-toggle="tooltip" data-original-title="Anderw">
                                        <img src={images['userlist-1.jpg']} alt="" />
                                    </a>
                                    <a href='https://google.com' title="" data-toggle="tooltip" data-original-title="frank">
                                        <img src={images['userlist-1.jpg']} alt="" />
                                    </a>
                                    <a href='https://google.com' title="" data-toggle="tooltip" data-original-title="Sara">
                                        <img src={images['userlist-1.jpg']} alt="" />
                                    </a>
                                    <a href='https://google.com' title="" data-toggle="tooltip" data-original-title="Amy">
                                        <img src={images['userlist-1.jpg']} alt="" />
                                    </a>
                                    <a href='https://google.com' title="" data-toggle="tooltip" data-original-title="Ema">
                                        <img src={images['userlist-1.jpg']} alt="" />
                                    </a>
                                    <a href='https://google.com' title="" data-toggle="tooltip" data-original-title="Sophie">
                                        <img src={images['userlist-1.jpg']} alt="" />
                                    </a>
                                    <a href='https://google.com' title="" data-toggle="tooltip" data-original-title="Maria">
                                        <img src={images['userlist-1.jpg']} alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageWidget