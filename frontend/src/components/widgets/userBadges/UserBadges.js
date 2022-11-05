import React from 'react'
import { images } from '../../../utils/imageParser'
import "./UserBadges.css"

const UserBadges = () => {
    return (
        <>
            <div class="widget">
                <h4 class="widget-title">User Badges <a class="see-all" href="https://www.google.com/" title="">See All</a></h4>
                <ul class="badgez-widget">
                    <li>
                        <a href="https://www.google.com/" title="" data-toggle="tooltip" data-original-title="Male User"><img src={images['badge2.png']} alt="" /></a>
                    </li>
                    <li>
                        <a href="https://www.google.com/" title="" data-toggle="tooltip" data-original-title="10 Years old User"><img src={images['year10.png']} alt=""/></a>
                    </li>
                    <li>
                        <a href="https://www.google.com/" title="" data-toggle="tooltip" data-original-title="Page Admin"><img src={images['badge1.png']} alt="" /></a>
                    </li>
                    <li>
                        <a href="https://www.google.com/" title="" data-toggle="tooltip" data-original-title="100+ Refferal"><img src={images['badge8.png']} alt="" /></a>
                    </li>
                    <li>
                        <a href="https://www.google.com/" title="" data-toggle="tooltip" data-original-title="Tranding Posts"><img src={images['badge21.png']} alt="" /></a>
                    </li>
                    <li>
                        <a href="https://www.google.com/" title="" data-toggle="tooltip" data-original-title="1000+ Subscribers"><img src={images['badge3.png']} alt="" /></a>
                    </li>
                    <li>
                        <a href="https://www.google.com/" title="" data-toggle="tooltip" data-original-title="Qbox Shirt winner"><img src={images['badge20.png']} alt="" /></a>
                    </li>
                    <li>
                        <a href="https://www.google.com/" title="" data-toggle="tooltip" data-original-title="500+ Followers"><img src="images/badges/badge10.png" alt="" /></a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default UserBadges