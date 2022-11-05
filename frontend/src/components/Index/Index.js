import React, { useCallback, useEffect, useState } from 'react'
import WeatherWidget from "../widgets/weatherWidget/WeatherWidget.js"
import BirthDay from "../widgets/birthDay/BirthDay.js"
import TwitterFeed from "../widgets/twitterFeed/TwitterFeed.js"
import Addvertisement from "../widgets/addvertise/Addvertisement.js"
import RecentActivity from "../widgets/recentAct/RecentActivity.js"
import Shortcuts from "../widgets/shortcuts/Shortcuts.js"
import Navigation from "../widgets/navigation/Navigation.js"
import CreatePost from "../widgets/createPost/CreatePost.js"
import RecentStrories from "../widgets/recentStories/RecentStories.js"
import QboxVideo from "../widgets/qboxVideo/QboxVideo.js"
import ExploreEvents from "../widgets/exploreEvents/ExploreEvents"
import Qbox from "../widgets/qbox/Qbox.js"
import ProfileIntro from "../widgets/profileIntro/ProfileIntro.js"
import RecentLinks from "../widgets/recentLinks/RecentLinks.js"
import GeneralPost from '../widgets/generalPost/GeneralPost.js'
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios'
import { baseURI } from '../../utils/helper.js'

const Index = () => {

  const [allPosts, setAllPosts] = useState([]);
  const allPostFun = useCallback((data) => {
    if (!data) return;
    else if (Array.isArray(data) && data.length == 0) return;
    else if (Array.isArray(data) && allPosts.length > 0) return setAllPosts([...allPosts, ...data]);
    else if (Array.isArray(data) && data.length > 0) return setAllPosts(data);
    else {
      return setAllPosts([data, ...allPosts])
    }
  }, [allPosts])

  const [page, setPage] = useState(2)
  const [more, setMore] = useState(true)

  const fetchMoreData = () => {
    setPage(page + 1)
    axios.get(`${baseURI}allPosts/${page}`, { withCredentials: true })
      .then((res) => {
        allPostFun(res.data.posts)
        if (res.data.posts.length === 0) return setMore(false)
      }).catch(err => console.log(err))
  }

  useEffect(() => {
    axios.get(`${baseURI}allPosts/${1}`, { withCredentials: true })
      .then(res => allPostFun(res.data.posts)).catch(err => console.log(err))
  }, [])

  return (
    <section>
      <div className="gap2 gray-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row merged20" id="page-contents">
                <div className="col-lg-3">
                  <aside className="sidebar static left">
                    <WeatherWidget />
                    <BirthDay />
                    {/* <Followings /> */}
                    <TwitterFeed />
                    <Addvertisement />
                    <RecentActivity />
                    <Shortcuts />
                  </aside>
                </div>
                <div className='col-lg-6'>
                  <Navigation />
                  <CreatePost getPosts={allPostFun} />
                  <RecentStrories />
                  <div className="loadMore">
                    <InfiniteScroll
                      dataLength={allPosts.length} //This is important field to render the next data
                      next={fetchMoreData}
                      hasMore={more}
                      loader={<h4>Loading...</h4>}
                      endMessage={
                        <p style={{ textAlign: 'center' }}>
                          <b>Yay! You have seen it all</b>
                        </p>
                      }
                    >
                      {allPosts && allPosts.map(p => {
                        return <GeneralPost getPosts={allPostFun} post={p} key={p._id} />
                      })}
                    </InfiniteScroll>
                  </div>
                </div>
                <div className="col-lg-3">
                  <aside className="sidebar static right">
                    <QboxVideo />
                    {/* <PageWidget /> */}
                    <ExploreEvents />
                    <Qbox />
                    <ProfileIntro />
                    <RecentLinks />
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Index