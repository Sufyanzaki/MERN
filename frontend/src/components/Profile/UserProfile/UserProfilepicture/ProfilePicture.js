import React from 'react'
import "./ProfilePicture.css"

const ProfilePicture = ({ prop, username }) => {
  return (

    <>
    {false && <div className='small-loader m-0 position-absolute'></div>}
      <form method='post' encType="multipart/form-data">
        < div className="profile-author-thumb" >
          {false ? (
            <>
              {/* <LazyLoadImage src={URL.createObjectURL(selectedImage)}
                className='image'
                alt="Thumb" />
              <button onClick={removeSelectedImage} className='delete'>
                <i className="fa-regular fa-xmark"></i>
              </button> */}
            </>
          ) : (true ? <img src='' alt='loading'/> : <img src='' alt='loading'/>)}


          {false? (
            false ?
              <button type='submit' className='submit_btn'><i className="fa-regular fa-check" /></button>
              : <div className="edit-dp">
                  <label className="fileContainer">
                    <i className="fa fa-camera" />
                    <input
                      accept=".png,.jpeg,.jpg"
                      type="file"
                      id='file'
                    />
                </label>
              </div>
          ) : <></>
          }
        </div>
      </form>
    </>
  );
};

export default ProfilePicture
