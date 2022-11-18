import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { baseURI } from '../../../../utils/helper';
import useLocalStorage from '../../../../utils/useLocalStorage';
import Spinner from '../../../Layouts/Loader/Loader';
import "./ProfilePicture.css"

const ProfilePicture = ({ user, changePic, confirm }) => {

  const [selectedImage, setSelectedImage] = useState();
  const [local,setLocal] = useLocalStorage('user');
  const {socket} = useSelector(state=>state.socket);
  const [load, setLoad] = useState(false);

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoad(true)
    const myForm = new FormData();
    const fileName = Date.now() + selectedImage.name;
    myForm.append("name", fileName);
    myForm.append("file", selectedImage);
    axios.post(`${baseURI}uploadImage`, myForm, { withCredentials: true })
    .then((res)=>{
      setLocal(res.data.message);
      setSelectedImage();
      setLoad(false);
      changePic(res.data.message.pic)
      if(!socket) return;
      socket.emit('profile-pic', {pic:res.data.message.pic, id:res.data.message._id})
    })
    .catch(err => console.log(err.data))
  }

  return (

    <>
    {load ? <Spinner/>:<form method='post' encType="multipart/form-data" onSubmit={handleSubmit}>
        < div className="profile-author-thumb" >
          {selectedImage ? (
            <>
              <img src={URL.createObjectURL(selectedImage)}
                className='image'
                alt="Thumb" />
              <button onClick={removeSelectedImage} className='delete'>
                <i><svg width='10px' viewBox="0 0 320 512"><path d="M312.1 375c9.369 9.369 9.369 24.57 0 33.94s-24.57 9.369-33.94 0L160 289.9l-119 119c-9.369 9.369-24.57 9.369-33.94 0s-9.369-24.57 0-33.94L126.1 256L7.027 136.1c-9.369-9.369-9.369-24.57 0-33.94s24.57-9.369 33.94 0L160 222.1l119-119c9.369-9.369 24.57-9.369 33.94 0s9.369 24.57 0 33.94L193.9 256L312.1 375z" /></svg></i>
              </button>
            </>
          ) : <img src={user && user.pic} alt='loading' />}


          {selectedImage ? <button type='submit' className='submit_btn'><i><svg width='15px' viewBox="0 0 512 512"><path d="M480.1 128.1l-272 272C204.3 405.7 198.2 408 192 408s-12.28-2.344-16.97-7.031l-144-144c-9.375-9.375-9.375-24.56 0-33.94s24.56-9.375 33.94 0L192 350.1l255-255c9.375-9.375 24.56-9.375 33.94 0S490.3 119.6 480.1 128.1z" /></svg></i></button>
            : local._id === (user && user._id) || confirm ? <div className="edit-dp">
            <label className="fileContainer">
              <i><svg width='20px' viewBox="0 0 512 512"><path d="M144 288C144 226.1 194.1 176 256 176C317.9 176 368 226.1 368 288C368 349.9 317.9 400 256 400C194.1 400 144 349.9 144 288zM256 224C220.7 224 192 252.7 192 288C192 323.3 220.7 352 256 352C291.3 352 320 323.3 320 288C320 252.7 291.3 224 256 224zM362.9 64.82L373.3 96H448C483.3 96 512 124.7 512 160V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V160C0 124.7 28.65 96 64 96H138.7L149.1 64.82C155.6 45.22 173.9 32 194.6 32H317.4C338.1 32 356.4 45.22 362.9 64.82H362.9zM64 144C55.16 144 48 151.2 48 160V416C48 424.8 55.16 432 64 432H448C456.8 432 464 424.8 464 416V160C464 151.2 456.8 144 448 144H338.7L317.4 80H194.6L173.3 144H64z" /></svg></i>
              <input
                accept=".png,.jpeg,.jpg"
                type="file"
                id='file'
                onChange={imageChange}
              />
            </label>
          </div> : <></>}
        </div>
      </form>}
    </>
  );
};

export default ProfilePicture
