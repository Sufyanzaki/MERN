import React from 'react'
import { images } from '../../../../utils/imageParser'

const Background = () => {

//   const style = {
//     close:{
//         top: "0",
//         position: "absolute",
//         left: "50%",
//         transform: "translateX(-50%)"
//     }
// }


  return (
    <>
      <form method='post' encType='multipart/form-data'>
      {
        <div className='edit-pp'>
        <label className='fileContainer'>
        <svg width='16px' fill='white' viewBox="0 0 512 512"><path d="M144 288C144 226.1 194.1 176 256 176C317.9 176 368 226.1 368 288C368 349.9 317.9 400 256 400C194.1 400 144 349.9 144 288zM256 224C220.7 224 192 252.7 192 288C192 323.3 220.7 352 256 352C291.3 352 320 323.3 320 288C320 252.7 291.3 224 256 224zM362.9 64.82L373.3 96H448C483.3 96 512 124.7 512 160V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V160C0 124.7 28.65 96 64 96H138.7L149.1 64.82C155.6 45.22 173.9 32 194.6 32H317.4C338.1 32 356.4 45.22 362.9 64.82H362.9zM64 144C55.16 144 48 151.2 48 160V416C48 424.8 55.16 432 64 432H448C456.8 432 464 424.8 464 416V160C464 151.2 456.8 144 448 144H338.7L317.4 80H194.6L173.3 144H64z"/></svg>
          <input accept='image/*' type='file' />
        </label>
      </div>
      }

        {true ? (
          <>
            <div>
            <img src={images['profile-image.jpg']} alt='Thumb'/>
          </div>

            {/* <div style={style.close}>
                <button type='submit'>
                    <i className='fa-regular fa-check' />
                </button>
                <button>
                <i className='fa-light fa-xmark'></i>
                </button>
            </div> */}
          </>
        ):<div className='default-img_container'><img src='' alt=""/></div>
      }
      </form>
    </>
  )
}

export default Background