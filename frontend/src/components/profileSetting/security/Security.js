import React from 'react'

const Security = () => {
  return (
    <div className='set-title'>
      <h5>Security Setting</h5>
      <span>
        trun on two factor authentication and check your list of connected
        device to keep your account posts safe{' '}
        <a href='https://google.com' title=''>
          Learn More
        </a>
        .
      </span>
      <div className='seting-box'>
        <p>
          to turn on two-factor authentication, you must{' '}
          <a href='https://google.com' title=''>
            {' '}
            confirm Your Email{' '}
          </a>{' '}
          and{' '}
          <a href='https://google.com' title=''>
            Set Password
          </a>
        </p>
        <div className='set-title'>
          <h5>Connected Devicese</h5>
        </div>
        <p>
          This is a list of devices that have logged into your account, Revok
          any session that you do not recognize.{' '}
          <a href='https://google.com' title=''>
            Hide Sessions
          </a>
        </p>
        <span>Last Accessed</span>
        <p>August 30, 2020 12:25AM</p>
        <span>Location</span>
        <p>Berlin, Germany (based on IP = 103.233.24.5)</p>
        <span>Device Type</span>
        <p>Chrome on windows 10</p>
      </div>
    </div>
  )
}

export default Security
