import React from 'react'
import "./Qbox.css"
import { images } from '../../../utils/imageParser'

const Qbox = () => {
    return (
        <div className="widget">
            <div className="post-creat">
                <div className="bg-feature">
                    <img src={images['post-createbg.jpg']} alt="" />
                        <span>Create</span>
                </div>
                <div className="create-meta">
                    <img src={images['logo2.png']} alt="" />
                        <p>
                            The Best Post on qbox for you, Pulled from the most active
                            communities on qbox. Check here to see the most shared, upvoted,
                            and commented content on the internet.
                        </p>
                        <a className="main-btn2" href="https://google.com" title="">Create Post</a>
                </div>
            </div>
        </div>)
}

export default Qbox