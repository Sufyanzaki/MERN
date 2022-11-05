import React from 'react'
import "./QboxVideo.css"
import { images } from "../../../utils/imageParser";

const QboxVideo = () => {
    return (
        <div className="widget">
            <h4 className="widget-title">How qbox Works</h4>
            <div className="how-to">
                <a href=""> 
                <img src={images['how-its-work.jpg']} alt="" />
                    <i>
                        <svg className="play" x="0px" y="0px" height="50px" width="50px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100"><path className="stroke-solid" fill="none" stroke="" d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7C97.3,23.7,75.7,2.3,49.9,2.5"></path><path className="icon" fill="" d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"></path></svg>
                    </i>
                </a>
            </div>
        </div>
    )
}

export default QboxVideo