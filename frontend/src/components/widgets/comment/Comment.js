import React from 'react';
import './comment.css';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago'
import englishString from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const Comment = ({props}) => {

    const formatter = buildFormatter(englishString)
    return (
        <>
            <li>
                <div className="comet-avatar">
                    <Link to={``}>
                        <img src={props.user.pic} alt="" />
                    </Link>
                </div>
                <div className="we-comment">
                    <h5><Link to={`/`} title="">{props.user.name}</Link> </h5>
                    <p>{props.comment}</p>
                    <div className="inline-itms">
                        <TimeAgo date={props.createdAt} formatter={formatter} />
                        <a href='https://google.com' className="we-reply" title="Reply"><i className="fa fa-reply"></i></a>
                        {/* <a href="https://google.com" title=""><i className="fa fa-heart"></i><span>0</span></a> */}
                    </div>
                    {/* this section is for replies */}
                    <ul className='comment-replies'>
                        <div className={`post-comt-box`}>
                            <form method="post">
                                <textarea placeholder="Post your reply" name='reply_text'></textarea>
                                <div className="add-smiles">
                                    <div className="uploadimage">
                                        <i className="fa fa-image"></i>
                                        <label className="fileContainer">
                                            <input type="file" />
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </ul>
                </div>

            </li>
        </>
    )
}

export default Comment;