import React from 'react'
import { useParams } from 'react-router-dom'
import MyPosts from './MyPosts/MyPosts'
import UserProfile from './UserProfile/UserProfile'

const Profile = ({changePic, allPostFun}) => {

  return (
    <div className='gray-bg gap2'>
    <div className='container'>
        <div className='row'>
        <UserProfile changePic={changePic} timeline="active"/>
        <MyPosts getPosts={allPostFun}/>
        </div>
    </div>
</div>
  )
}

export default Profile