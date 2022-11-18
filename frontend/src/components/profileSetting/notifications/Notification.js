import React from 'react'
import Select from 'react-select'

const Notification = () => {

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return (
    <div className='set-title'>
      <h5>Notification Setting</h5>
      <span>Select push and email notifications you'd like to receive.</span>
      <div className='notifi-seting'>
        <div className='form-radio'>
          <div className='radio'>
            <label>
              <input type='radio' checked='checked' />
              <i className='check-box'></i>
              Send Me emails about my activity except emails i have unsubscribe
              from
            </label>
          </div>
          <div className='radio'>
            <label>
              <input type='radio' name='radio' />
              <i className='check-box'></i>
              Only send me required services announcements.
            </label>
          </div>
        </div>
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
          <h6>Other Notifications</h6>
        </div>
        <div className='checkbox'>
          <label>
            <input type='checkbox' checked='checked' />
            <i className='check-box'></i>
            Recommended videos.
          </label>
          <label>
            <input type='checkbox' checked='checked' />
            <i className='check-box'></i>
            activity on my page or channel.
          </label>
          <label>
            <input type='checkbox' checked='checked' />
            <i className='check-box'></i>
            Activity on my comments.
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
          <span>Select your email language</span>
        </div>
        <Select options={options}></Select>
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

export default Notification
