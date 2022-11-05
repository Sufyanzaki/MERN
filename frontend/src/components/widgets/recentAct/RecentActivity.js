import React from 'react'
import "./RecentActivity.css"

const RecentActivity = () => {
  return (
    <div className="widget">
        <h4 className="widget-title">Recent Activity</h4>
        <ul className="activitiez">
            <li>
                <div className="activity-meta">
                    <i>10 hours Ago</i>
                    <span><a href="https://google.com" title="">Commented on Video posted </a></span>
                    <h6>by <a href="timeline.html">black demon.</a></h6>
                </div>
            </li>
            <li>
                <div className="activity-meta">
                    <i>30 Days Ago</i>
                    <span><a href="https://google.com" title="">Posted your status. “Hello guys, how
                            are you?”</a></span>
                </div>
            </li>
            <li>
                <div className="activity-meta">
                    <i>2 Years Ago</i>
                    <span><a href="https://google.com" title="">Share a video on her
                            timeline.</a></span>
                    <h6>"<a href="https://google.com">you are so funny mr.been.</a>"</h6>
                </div>
            </li>
        </ul>
    </div>
  )
}

export default RecentActivity