import React from 'react'
import "./Footer.css"
import creditCards from '../../../images/credit-cards.png'

const Footer = () => {
    return (
        <div className="bottombar">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <span className="copyright">© qbox 2020. All rights reserved.</span>
                        <i><img src={creditCards} alt="" /></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer