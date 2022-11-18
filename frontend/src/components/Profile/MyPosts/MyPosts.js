import React, { useCallback, useEffect, useState } from 'react'
import Addvertisement from '../../widgets/addvertise/Addvertisement'
import CreatePost from '../../widgets/createPost/CreatePost'
import FavoritePage from '../../widgets/favoritePage/FavoritePage'
import Followings from '../../widgets/followings/Followings'
import PageWidget from '../../widgets/pageWidget/PageWidget'
import ProfileIntro from '../../widgets/profileIntro/ProfileIntro'
import RecentActivity from '../../widgets/recentAct/RecentActivity'
import Shortcuts from '../../widgets/shortcuts/Shortcuts'
import TwitterFeed from '../../widgets/twitterFeed/TwitterFeed'
import UserBadges from '../../widgets/userBadges/UserBadges'
import WeatherWidget from '../../widgets/weatherWidget/WeatherWidget'
import GeneralPost from '../../widgets/generalPost/GeneralPost'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';
import { baseURI } from '../../../utils/helper'
import { useParams } from 'react-router-dom'

const MyPosts = ({ getPosts }) => {
    // remove all post fun 
    const { id } = useParams();

    const [profilePost, setProfilePost] = useState([]);
    const [page, setPage] = useState(1)
    const [more, setMore] = useState(true)

    //to append data to prolfile posts
    const profilePostFun = useCallback((data) => {
        if (!data) return;
        else if (Array.isArray(data) && data.length === 0) return;
        else if (Array.isArray(data) && profilePost.length > 0) return setProfilePost([...profilePost, ...data]);
        else if (Array.isArray(data) && data.length > 0) return setProfilePost(data);
        else {
            return setProfilePost([data, ...profilePost])
        }
    }, [profilePost])

    const fetchMoreData = () => {
        setPage(page + 1)
        axios.post(`${baseURI}userPosts/${page}`, { userId: id }, { withCredentials: true })
            .then((res) => {
                setProfilePost(res.data.posts)
                if (res.data.posts.length < 8) return setMore(false)
            }).catch(err => console.log(err))
    }

    useEffect(() => {
        axios.post(`${baseURI}userPosts/${page}`, { userId: id }, { withCredentials: true })
            .then(res => {
                setProfilePost(res.data.posts);
                if (res.data.posts.length < 8) return setMore(false)
            })
            .catch(err => console.log(err))
    }, [id])

    return (
        <>
            <div className="col-lg-3">
                <aside className="sidebar static left">
                    <UserBadges />
                    <WeatherWidget />
                    <Followings />
                    <TwitterFeed />
                    <Addvertisement />
                    <RecentActivity />
                    <Shortcuts />
                </aside>
            </div>
            <div className='col-lg-6'>
                <CreatePost getPosts={getPosts} profilePostFun={profilePostFun} />
                <div className="loadMore">
                    <InfiniteScroll
                        dataLength={profilePost.length} //This is important field to render the next data
                        next={fetchMoreData}
                        hasMore={more}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {profilePost && profilePost.map(p => {
                            return <GeneralPost post={p} key={p._id} />
                        })}</InfiniteScroll>
                </div>
            </div>
            <div className="col-lg-3">
                <aside className="sidebar static right">
                    <PageWidget />
                    <ProfileIntro />
                    <FavoritePage />
                </aside>
            </div>
        </>)
}

export default MyPosts