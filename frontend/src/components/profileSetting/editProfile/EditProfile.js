import React, {  useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Select from 'react-select'
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
                  style={{width: '50px',borderRadius:'50%', height:'50px'}}
                  src={URL.createObjectURL(selectedImage)}
                  alt='Thumb'
                />{' '}
                <button onClick={removeSelectedImage} style={closeBtn}>
                <svg style={{width:'9px', margin:'0'}} viewBox="0 0 320 512"><path d="M312.1 375c9.369 9.369 9.369 24.57 0 33.94s-24.57 9.369-33.94 0L160 289.9l-119 119c-9.369 9.369-24.57 9.369-33.94 0s-9.369-24.57 0-33.94L126.1 256L7.027 136.1c-9.369-9.369-9.369-24.57 0-33.94s24.57-9.369 33.94 0L160 222.1l119-119c9.369-9.369 24.57-9.369 33.94 0s9.369 24.57 0 33.94L193.9 256L312.1 375z"/></svg>
                </button>
              </figure>
            </>
          ):<img src={user && user.pic} style={{width: '50px',borderRadius:'50%', height:'50px'}} alt="QBOX" />}

          <div className='edit-img'>
            <form className='edit-phto'>
              <label className='fileContainer'>
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
              defaultValue={user._id}
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
                    defaultChecked
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
                    defaultChecked
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
            <label style={{display:'inline-block', width:'45%'}}>Location</label>
            <button style={{display:'inline-block', width:'23%'}}>Fetch my location</button>
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
