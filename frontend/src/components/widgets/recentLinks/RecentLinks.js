import React from 'react'
import { images } from '../../../utils/imageParser'
import "./RecentLinks.css"

const RecentLinks = () => {
  return (
    <div className="widget stick-widget">
    <h4 className="widget-title">Recent Links <a title="" href='https://google.com' className="see-all">See All</a></h4>
    <ul className="recent-links">
        <li>
            <figure><img src={images['recentlink-1.jpg']} alt="" />
            </figure>
            <div className="re-links-meta">
                <h6><a href='https://google.com' title="">moira's fade reaches much farther than
                        you think.</a></h6>
                <span>2 weeks ago </span>
            </div>
        </li>
        <li>
            <figure><img src={images['recentlink-1.jpg']} alt="" />
            </figure>
            <div className="re-links-meta">
                <h6><a href='https://google.com' title="">daniel asks if we want him to do the
                        voice of doomfist</a></h6>
                <span>3 months ago </span>
            </div>
        </li>
        <li>
            <figure><img src={images['recentlink-1.jpg']} alt="" />
            </figure>
            <div className="re-links-meta">
                <h6><a href='https://google.com' title="">the qbox overwatch scandals.</a></h6>
                <span>1 day before</span>
            </div>
        </li>
    </ul>
</div>
  )
}

export default RecentLinks