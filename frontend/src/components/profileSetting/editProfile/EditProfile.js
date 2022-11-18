import React, {  useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select'
import useLocalStorage from '../../../utils/useLocalStorage';
import "./EditProfile.css"

const EditProfile = () => {

  const [selectedImage, setSelectedImage] = useState();

  const [user,] = useLocalStorage('user')

  const [form, setForm] = useState({
    name:user.name, username:user.username, email:user.email, gender:user.gender, about:user.about===null?"":user.about, location:user.location===null?"":user.location
  })

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const closeBtn ={
    border:"1px solid black",
    borderRadius:"50%",
    outline:"none",
    background:"rgba(255,255,255,0.4)",
    position:"absolute",
    width:"25px",
    height:"25px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    right:"0",top:"0"
  }

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
        setSelectedImage(e.target.files[0]);
    }
};
const removeSelectedImage = () => {
    setSelectedImage();
};

const handleChange=(e)=>{
  console.log('')
}

const handleSubmit=(e)=>{
  console.log(form)
  e.preventDefault();
}

  return (
    <div className='set-title'>
      <ToastContainer/>
      <h5>Edit Profile</h5>
      <span>People on Qbox will get to know you with the info below</span>
      <div className='setting-meta'>
        <div className='change-photo'>
          {selectedImage ? (
            <>
              <figure style={{ position: 'relative' }}>
                <img
                  style={{
                    maxWidth: '66px',
                    maxHeight: '66px',
                    minWidth: '66px'
                  }}
                  src={URL.createObjectURL(selectedImage)}
                  alt='Thumb'
                />{' '}
                <button onClick={removeSelectedImage} style={closeBtn}>
                  xmark
                </button>
              </figure>
            </>
          ):<img alt="QBOX" />}

          <div className='edit-img'>
            <form className='edit-phto'>
              <label className='fileContainer'>
              cameraretro
                Chage DP
                <input
                  accept='image/*'
                  type='file'
                  onChange={imageChange}
                  name='image'
                />
              </label>
            </form>
          </div>
        </div>
      </div>
      <div className='stg-form-area'>
        <form method='post' className='c-form' onSubmit={handleSubmit}>
          <div>
            <label>Display Name</label>
            <input
              type='text'
              name='name'
              onChange={handleChange}
              defaultValue={user.name}
            />
          </div>

          <div className='uzer-nam'>
            <label>User Name</label>
            <span>www.Qbox.com/</span>
            <input
              type='text'
              defaultValue={`${user.username}`}
              name='username'
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email Address</label>
            <input
              type='text'
              defaultValue={`${user.email}`}
              name='email'
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Gender</label>
            <div className='form-radio'>
              <div className='radio'>
                <label>
                  <input
                    type='radio'
                    checked='checked'
                    name='gender'
                    onChange={handleChange}
                    value="male"
                  />
                  <i className='check-box'></i>Male
                </label>
              </div>
              <div className='radio'>
                <label>
                  <input
                    type='radio'
                    name='gender'
                    checked='checked'
                    onChange={handleChange}
                    value='female'
                  />
                  <i className='check-box'></i>Female
                </label>
              </div>
              <div className='radio'>
                <label>
                  <input
                    type='radio'
                    name='gender'
                    onChange={handleChange}
                    value='custom'
                  />
                  <i className='check-box'></i>Custom
                </label>
              </div>
            </div>
          </div>
          <div>
            <label>about your profile</label>
            <textarea
              rows='3'
              name='about'
              onChange={handleChange}
              placeholder='Write someting about yourself'
              defaultValue={user.about === null ? '':user.about}

            ></textarea>
          </div>

          <div>
            <label>Location</label>
            <input
              type='text'
              name='location'
              onChange={handleChange}
              placeholder="Where do you live"
              defaultValue={user.location  === null ? '':user.location}
            />
          </div>
          <div>
            <label>Country</label>
            <Select
              options={options}
              defaultValue={options[options.findIndex(x => x.value ===user.country)]}
              name='country'
              onChange={e => {
                setForm(prev => {
                  return {
                    ...prev,
                    country: e.value
                  }
                })
              }}
            />
          </div>
          <div>
            <button type='button' data-ripple=''>
              Cancel
            </button>
            <button type='submit' data-ripple=''>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
