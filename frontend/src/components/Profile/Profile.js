import React from 'react'
import MyPosts from './MyPosts/MyPosts'
import UserProfile from './UserProfile/UserProfile'

const Profile = () => {
  return (
    <div className='gray-bg gap2'>
    <div className='container'>
        <div className='row'>
        <UserProfile/>
        <MyPosts />
        </div>
    </div>
</div>
  )
}

export default Profile