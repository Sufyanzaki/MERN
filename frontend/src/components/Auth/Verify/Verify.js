import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseURI } from '../../../utils/helper'
import { images } from '../../../utils/imageParser'
import "./Verify.css"

const Verify = () => {

    let { token } = useParams();
    const [success, setSuccess] = useState(null)
  
    useEffect(() => {
      axios.put(`${baseURI}auth/${token}`).then(res => setSuccess(true))
        .catch(err => setSuccess(false));
    }, [token])

  return (
    <div className='verify- box_wrapper'>
        <div className='verify-box_container'>
            <div className='verify-box_header'>
                <div className='verify-header_left'>
                    <div className='verify-box_logo'>
                        <img src={images['logo2.png']} alt=''/>
                    </div>
                    <div className='verify-box_search'>
                    <svg width='18px' viewBox="0 0 512 512"><path d="M507.3 484.7l-141.5-141.5C397 306.8 415.1 259.7 415.1 208c0-114.9-93.13-208-208-208S-.0002 93.13-.0002 208S93.12 416 207.1 416c51.68 0 98.85-18.96 135.2-50.15l141.5 141.5C487.8 510.4 491.9 512 496 512s8.188-1.562 11.31-4.688C513.6 501.1 513.6 490.9 507.3 484.7zM208 384C110.1 384 32 305 32 208S110.1 32 208 32S384 110.1 384 208S305 384 208 384z"/></svg>
                        <input type='text' placeholder='Search'/>
                    </div>
                </div>
                <div className='verify-header_right'>
                    <div className='verify-header_button'>
                        <button type='button'>
                       <i> <svg width='16px' viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM224 32c52.94 0 96 43.06 96 96c0 52.93-43.06 96-96 96S128 180.9 128 128C128 75.06 171.1 32 224 32zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM413.3 480H34.66C33.2 480 32 478.8 32 477.3C32 399.4 95.4 336 173.3 336h101.3C352.6 336 416 399.4 416 477.3C416 478.8 414.8 480 413.3 480z"/></svg></i>
                            Log In</button>
                    </div>
                </div>
            </div>
            <div className='verify-box_body'>
                <img src='https://freewebillustrations.com/static/images/preview/ouch-marginalia-success.png' alt=''/>
                {success && <span>You have verified <h4>email@gmail.com</h4></span>}
                <button type='button'>Go to profile<pre><svg width='18px' viewBox="0 0 512 512"><path d="M363.3 100.7l144 144C510.4 247.8 512 251.9 512 255.1s-1.562 8.188-4.688 11.31l-144 144c-6.25 6.25-16.38 6.25-22.62 0s-6.25-16.38 0-22.62l116.7-116.7H16c-8.844 0-16-7.156-16-15.1c0-8.844 7.156-16 16-16h441.4l-116.7-116.7c-6.25-6.25-6.25-16.38 0-22.62S357.1 94.44 363.3 100.7z"/></svg></pre></button>
                <p>it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will </p>
                <div className='verify-app_store'>
                    <svg viewBox="0 0 384 512" width='23px'><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                    <div>
                        <span>Also available on</span>
                        <strong>App Store</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Verify