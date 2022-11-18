import React from 'react'

const Message = () => {
  return (
    <div className='set-title'>
      <h5>Messages Setting</h5>
      <span>
        Set your login preference, help us personalize your experience and make
        big account change here.
      </span>
      <div className='mesg-seting'>
        <div className='set-title'>
          <h6>i'd like to receive emails and updates from Qbox about</h6>
        </div>
        <div className='checkbox'>
          <label>
            <input type='checkbox' checked='checked' />
            <i className='check-box'></i>
            Always General announcement, updates, posts, and videos.
          </label>
          <label>
            <input type='checkbox' checked='checked' />
            <i className='check-box'></i>
            Personalise tips for my page.
          </label>
          <label>
            <input type='checkbox' checked='checked' />
            <i className='check-box'></i>
            Announcements and recommendations.
          </label>
          <p>
            <a href='https://google.com' title=''>
              learn more
            </a>{' '}
            about emails from Qbox
          </p>
        </div>
        <div className='set-title'>
          <h6>Other Messages</h6>
        </div>
        <div className='checkbox'>
          <label>
            <input type='checkbox' checked='checked' />
            <i className='check-box'></i>
            From Recommended videos.
          </label>
          <label>
            <input type='checkbox' checked='checked' />
            <i className='check-box'></i>
            Messages from activity on my page or channel.
          </label>
          <label>
            <input type='checkbox' checked='checked' />
            <i className='check-box'></i>
            Message me the replyer Activity on my comments.
          </label>
          <label>
            <input type='checkbox' checked='checked' />
            <i className='check-box'></i>
            Reply to comments.
          </label>
          <label>
            <input type='checkbox' checked='checked' />
            <i className='check-box'></i>
            Mentions.
          </label>
        </div>
        <div className='set-title'>
          <h6>Language Preference</h6>
          <span>Select your Messages language</span>
        </div>
        {/* <Select options={options}></Select> */}
        <p>
          you will always get notifications you have turned on for individual{' '}
          <a href='https://google.com' title=''>
            Manage All Subscriptions
          </a>
        </p>
      </div>
    </div>
  )
}

export default Message
