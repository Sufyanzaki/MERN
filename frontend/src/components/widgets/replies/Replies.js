import React from "react";
import './replies.css'
import { Link } from "react-router-dom";

const Replies = ({ reply }) => {

    return (
        <li>
            <div className="comet-avatar">
                <img src='' alt="" />
            </div>
            <div className="we-comment">
                <h5>
                    <Link to={`/`} title="">
                        name
                    </Link>
                </h5>
                <p>comment</p>
                <div className="inline-itms">
                    <span>
                        10 misn ago
                    </span>
                    <a className="we-reply" href="https://google.com" title="Reply">
                        <i className="fa fa-reply"></i>
                    </a>
                    {/* <a href="https://google.com" title="">
                        <i className="fa fa-heart"></i>
                        <span>20</span>
                    </a> */}
                </div>
            </div>
        </li>
    );
};

export default Replies;
