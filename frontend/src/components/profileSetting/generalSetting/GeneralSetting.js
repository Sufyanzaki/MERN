import React from 'react'

const GeneralSetting = () => {
  return (
    <div className='set-title'>
      <h5>General Setting</h5>
      <span>
        Set your login preference, help us personalize your experience and make
        big account change here.
      </span>

      <div className='onoff-options '>
        <form method='post'>
          <div className='setting-row'>
            <span>Sub users</span>
            <p>Enable this if you want people to follow you</p>
            <input type='checkbox' id='switch00' />
            <label
              htmlFor='switch00'
              data-on-label='ON'
              data-off-label='OFF'
            ></label>
          </div>
          <div className='setting-row'>
            <span>Enable follow me</span>
            <p>Enable this if you want people to follow you</p>
            <input type='checkbox' id='switch01' />
            <label
              htmlFor='switch01'
              data-on-label='ON'
              data-off-label='OFF'
            ></label>
          </div>
          <div className='setting-row'>
            <span>Send me notifications</span>
            <p>
              Send me notification emails my friends like, share or message me
            </p>
            <input type='checkbox' id='switch02' />
            <label
              htmlFor='switch02'
              data-on-label='ON'
              data-off-label='OFF'
            ></label>
          </div>
          <div className='setting-row'>
            <span>Text messages</span>
            <p>Send me messages to my cell phone</p>
            <input type='checkbox' id='switch03' />
            <label
              htmlFor='switch03'
              data-on-label='ON'
              data-off-label='OFF'
            ></label>
          </div>
          <div className='setting-row'>
            <span>Enable tagging</span>
            <p>Enable my friends to tag me on their posts</p>
            <input type='checkbox' id='switch04' />
            <label
              htmlFor='switch04'
              data-on-label='ON'
              data-off-label='OFF'
            ></label>
          </div>
          <div className='setting-row'>
            <span>Enable sound Notification</span>
            <p>
              You'll hear notification sound when someone sends you a private
              message
            </p>
            <input type='checkbox' id='switch05' checked='' />
            <label
              htmlFor='switch05'
              data-on-label='ON'
              data-off-label='OFF'
            ></label>
          </div>

          <div className='submit-btns'>
            <button type='submit' className='main-btn' data-ripple=''>
              <span>Save</span>
            </button>
            <button type='button' className='main-btn3' data-ripple=''>
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
      <div className='account-delete'>
        <h5>Account Changes</h5>
        <div>
          <span>Hide Your Posts and profile </span>
          <button type='button' className=''>
            <span>Deactivate account</span>
          </button>
        </div>
        <div>
          <span>Delete your account and data </span>
          <button type='button' className=''>
            <span>close account</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default GeneralSetting
