import React from 'react'
import "./Followings.css"
import ToFollowUser from '../ToFollowUser/ToFollowUser';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const Followings = () => {
    return (
        <div className="widget">
            <h4 className="widget-title">People you may know</h4>
            <ul className="followers">
                <SimpleBar style={{ maxHeight: 300 }}>
                    <ToFollowUser />
                </SimpleBar>
            </ul>
        </div>
    )
}

export default Followings