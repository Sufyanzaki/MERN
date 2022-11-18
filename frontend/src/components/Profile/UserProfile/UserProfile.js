import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Background from './background/Background';
import ProfilePicture from './UserProfilepicture/ProfilePicture';
import "./UserProfile.css"
import axios from 'axios';
import { baseURI } from '../../../utils/helper';
import Spinner from '../../Layouts/Loader/Loader';
import useLocalStorage from '../../../utils/useLocalStorage';

const UserProfile = ({ userId, changePic }) => {

    const url = window.location.href;
    const confirm = url.includes('edit')

    const [user, setUser] = useState(null)
    const [local, setLocal] = useLocalStorage('user')
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`${baseURI}user/${userId ? userId : local._id}`, { withCredentials: true })
            .then((res) => { setUser(res.data.user); setLoading(false) })
            .catch(err => console.log(err))
    }, [userId, local._id])

    const followUser = (e, id) => {
        e.preventDefault();
        axios.get(`${baseURI}follow/${id}`, { withCredentials: true })
            .then(res => { setLocal(res.data.message) }).catch(err => console.log(err))
    }

    const addFriend = (e, id) => {
        e.preventDefault();
        axios.get(`${baseURI}request/${id}`, { withCredentials: true })
            .then(res => { setLocal(res.data.user) }).catch(err => console.log(err))
    }

    return (
        <div className='col-lg-12'>
            <div className='row merged20' id='page-contents'>
                {loading ? <Spinner /> : <div className='user-profile'>
                    <figure>
                        <Background userId={userId} />
                        {(local._id !== userId || !confirm) && <ul className='profile-controls'>
                            <li>
                                {local.sentRequests.includes(userId) ? <span title='Cancel' data-toggle='tooltip' onClick={(e) => { addFriend(e, user._id) }}>
                                    <svg viewBox="0 0 640 512"><path d="M274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM48.71 464C55.38 401.1 108.7 352 173.3 352H274.7c64.61 0 117.1 49.13 124.6 112H48.71zM224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80C179.9 208 144 172.1 144 128C144 83.89 179.9 48 224 48zM616 200h-144C458.8 200 448 210.8 448 224s10.75 24 24 24h144C629.3 248 640 237.3 640 224S629.3 200 616 200z" /></svg>
                                </span> : <span title='Add friend' data-toggle='tooltip' onClick={(e) => { addFriend(e, user._id) }}>
                                    <svg viewBox="0 0 640 512"><path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80C179.9 208 144 172.1 144 128C144 83.89 179.9 48 224 48zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM48.71 464C55.38 401.1 108.7 352 173.3 352H274.7c64.61 0 117.1 49.13 124.6 112H48.71zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z" /></svg>
                                </span>}
                            </li>
                            <li>
                                {local.following.includes(userId) ? <span title='Unfollow' data-toggle='tooltip' onClick={(e) => { followUser(e, user._id) }}>
                                <svg viewBox="0 0 576 512"><path d="M424 32h-143.1C266.8 32 256 42.75 256 56s10.75 24 24 24h86.06L7.031 439c-9.375 9.375-9.375 24.56 0 33.94s24.56 9.375 33.94 0L400 113.9V200C400 213.3 410.8 224 424 224S448 213.2 448 199.1V56C448 42.84 437.2 32 424 32zM167.4 233.4l33.94-33.94L40.97 39.03c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94L167.4 233.4zM424 288c-13.25 0-24 10.75-24 24v86.06l-119.4-119.4l-33.94 33.94L366.1 432H280c-13.25 0-24 10.75-24 24S266.8 480 280 480H424c13.16 0 24-10.81 24-24V312C448 298.8 437.3 288 424 288z"/></svg>
                                </span> : <span title='Follow' data-toggle='tooltip' onClick={(e) => { followUser(e, user._id) }}>
                                    <svg viewBox="0 0 576 512"><path d="M528.5 171.5l-146.4-21.29l-65.43-132.4C310.9 5.971 299.4-.002 287.1 0C276.6 0 265.1 5.899 259.3 17.8L193.8 150.2L47.47 171.5C21.2 175.3 10.68 207.6 29.72 226.1l105.9 102.1L110.6 474.6C107 495.3 123.6 512 142.2 512c4.932 0 10.01-1.172 14.88-3.75L288 439.6l130.9 68.7c4.865 2.553 9.926 3.713 14.85 3.713c18.61 0 35.21-16.61 31.65-37.41l-25.05-145.5l105.9-102.1C565.3 207.6 554.8 175.3 528.5 171.5zM390.2 320.6l22.4 130.1l-117.2-61.48c-4.655-2.442-10.21-2.442-14.87 .0001L163.4 450.7l22.4-130.1C186.7 315.4 184.1 310.1 181.2 306.4l-94.7-92.09l130.9-19.04C222.6 194.5 227.1 191.2 229.4 186.5L288 67.99l58.59 118.5c2.331 4.717 6.833 7.986 12.04 8.744l130.9 19.04l-94.7 92.09C391 310.1 389.3 315.4 390.2 320.6z" /></svg>
                                </span>}
                            </li>
                            <li>
                                <span
                                    className='send-mesg'
                                    title='Send Message'
                                    data-toggle='tooltip'
                                >
                                    <svg viewBox="0 0 512 512"><path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z" /></svg>
                                </span>
                            </li>
                            <li>
                                <div className='edit-seting' title='Edit Profile image'>
                                    <svg viewBox="0 0 512 512"><path d="M400 256c0 26.5 21.5 48 48 48s48-21.5 48-48S474.5 208 448 208S400 229.5 400 256zM112 256c0-26.5-21.5-48-48-48S16 229.5 16 256S37.5 304 64 304S112 282.5 112 256zM304 256c0-26.5-21.5-48-48-48S208 229.5 208 256S229.5 304 256 304S304 282.5 304 256z" /></svg>                                    <ul className='more-dropdown'>
                                        <li>
                                            <a href='https://google.com'>Update Profile Photo</a>
                                        </li>
                                        <li>
                                            <a href='https://google.com'>Update Header Photo</a>
                                        </li>
                                        <li>
                                            <a href='https://google.com'>Account Settings</a>
                                        </li>
                                        <li>
                                            <a href='https://google.com'>Find Support</a>
                                        </li>
                                        <li>
                                            <a className='bad-report' href='https://google.com'>
                                                Report Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a href='https://google.com'>Block Profile</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>}
                        <ol className='pit-rate'>
                            <li className='rated'>
                                <i className='fa fa-star' />
                            </li>
                            <li className='rated'>
                                <i className='fa fa-star' />
                            </li>
                            <li className='rated'>
                                <i className='fa fa-star' />
                            </li>
                            <li className='rated'>
                                <i className='fa fa-star' />
                            </li>
                            <li className='rated'>
                                <i className='fa fa-star' />
                            </li>
                            <li>
                                <span>4.7/5</span>
                            </li>
                        </ol>
                    </figure>
                    <div className='profile-section'>
                        <div className='row'>
                            <div className='col-lg-2 col-md-3'>
                                <div className='profile-author'>
                                    <ProfilePicture confirm={confirm} changePic={changePic} user={user} />
                                    <div className='author-content'>
                                        <Link to={'/'} className='h4 author-name'>
                                            {user && user.name}
                                        </Link>
                                        <div className='country'>Ontario, CA</div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-10 col-md-9 flex-me'>
                                <ul className='profile-menu'>
                                    <li>
                                        <Link to={'/'} className="timeline active">Timeline</Link>
                                    </li>
                                    <li>
                                        <Link to={'/'} className="about">About</Link>
                                    </li>
                                    <li>
                                        <Link to={'/'} className="friends">Friends</Link>
                                    </li>
                                    <li>
                                        <Link to={'/'} className="photos">Photos</Link>
                                    </li>
                                    <li>
                                        <Link to={'/'} className="videos">Videos</Link>
                                    </li>
                                    <li>
                                        <div className='more'>
                                            <svg viewBox="0 0 512 512"><path d="M400 256c0 26.5 21.5 48 48 48s48-21.5 48-48S474.5 208 448 208S400 229.5 400 256zM112 256c0-26.5-21.5-48-48-48S16 229.5 16 256S37.5 304 64 304S112 282.5 112 256zM304 256c0-26.5-21.5-48-48-48S208 229.5 208 256S229.5 304 256 304S304 282.5 304 256z" /></svg>
                                            <ul className='more-dropdown'>
                                                <li>
                                                    <a href='https://google.com'>Profile Groups</a>
                                                </li>
                                                <li>
                                                    <a href='https://google.com'>Profile Analytics</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                                <ol className='folw-detail flex-me'>
                                    <li>
                                        <span>Posts</span>
                                        <ins>{user && user.posts.length}</ins>
                                    </li>
                                    <li>
                                        <span>Followers</span>
                                        <ins>{user && user.following.length}</ins>
                                    </li>
                                    <li>
                                        <span>Following</span>
                                        <ins>{user && user.followers.length}</ins>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>)
}

export default UserProfile