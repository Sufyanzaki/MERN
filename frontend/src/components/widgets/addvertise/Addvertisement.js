import React from 'react'
import { images } from '../../../utils/imageParser'
import "./Addvertisement.css"

const Addvertisement = () => {
  return (
    <div className="advertisment-box">
        <h4 className="">advertisment</h4>
        <figure>
            <a href="https://www.google.com/" title="Advertisment">
                <img src={images['vid-1.jpg']} alt="" />
                </a>
        </figure>
    </div>  )
}

export default Addvertisement