import React from 'react'
import { images } from '../../../utils/imageParser'
import "./FavoritePage.css";

const FavoritePage = () => {
    return (
        <>
            <div className="widget">
                <div className="banner medium-opacity purple">
                    <div className="bg-image" style={{backgroundImage: `url(${images['baner-widgetbg.jpg']})`}}></div>
                    <div className="baner-top">
                        <span><img alt="" src={images['book-icon.png']} /></span>
                        <i className="fa fa-ellipsis-h"></i>
                    </div>
                    <div className="banermeta">
                        <p>
                            create your own favourit page.
                        </p>
                        <span>like them all</span>
                        <a data-ripple="" title="" href='https://google.com'>start now!</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FavoritePage