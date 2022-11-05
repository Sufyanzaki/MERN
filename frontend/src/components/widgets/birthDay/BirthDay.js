import React from 'react'
import { Link } from 'react-router-dom'
import { images } from '../../../utils/imageParser'
import './BirthDay.css';

const BirthDay = () => {
    return (
        <div className="widget">
            <div style={{ backgroundImage: `url(${images['dob2.png']})` }} className="bg-image"></div>
            <div className="dob-head">
                <img src={images['sug-page-5.jpg']} alt="" />
                <span>22nd Birthday</span>
                <div className="dob">
                    <i>19</i>
                    <span>September</span>
                </div>
            </div>
            <div className="dob-meta">
                <figure><img src="http://html.qbox.mn/images/resources/dob-cake.gif" alt="" /></figure>
                <h6><Link to={'/'} title="">Lucy Carbel</Link> valentine's birthday</h6>
                <p>leave a message with your best wishes on his profile.</p>
            </div>
        </div>
    )
}

export default BirthDay