import React from 'react'
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

const MyPosts = () => {
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
        <CreatePost />
        <div className="loadMore">
            {/* {(posts.length !== 0) ? posts.map((p) => (
                
            )) : ''}
            {postLength < 5 ? <div className='loader-parent'>
                <p>No more posts</p>
            </div> : <div className='loader-parent'>
                <div className='small-loader'></div>
            </div>} */}
        </div>
    </div>
    <div className="col-lg-3">
        <aside className="sidebar static right">
            <PageWidget />
            <ProfileIntro />
            <FavoritePage />
        </aside>
    </div>
</>  )
}

export default MyPosts