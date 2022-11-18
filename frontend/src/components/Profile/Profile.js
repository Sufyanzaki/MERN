import React from 'react'
import { useParams } from 'react-router-dom'
import MyPosts from './MyPosts/MyPosts'
import UserProfile from './UserProfile/UserProfile'

const Profile = ({changePic, allPostFun}) => {

  const {id} = useParams();

  return (
    <div className='gray-bg gap2'>
    <div className='container'>
        <div className='row'>
        <UserProfile changePic={changePic} userId={id}/>
        <MyPosts getPosts={allPostFun}/>
        </div>
    </div>
</div>
  )
}

export default Profile