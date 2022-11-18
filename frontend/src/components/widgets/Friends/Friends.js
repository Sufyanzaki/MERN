import axios from 'axios'
import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import './Friends.css'
import { Link, useParams } from 'react-router-dom';
import UserProfile from '../../Profile/UserProfile/UserProfile';
import { baseURI } from '../../../utils/helper';

const Friends = () => {

const [friends, setFriends] = useState([])

  //config
  let { id } = useParams();

  //hitting api
  useEffect(()=>{
    axios.get(`${baseURI}user/${id}`, {withCredentials:true})
    .then((res)=>setFriends(res.data.user.friends)).catch(err=>console.log(err))
  }, [id])

  //chosen testing zone
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  return (

    <div className='gray-bg'>
      <div className='container'>
        <div className='row'>
          <UserProfile/>
          <div className='col-lg-12'>
            <div className='central-meta'>
              <div className='title-block'>
                <div className='row'>
                  <div className='col-lg-6'>
                    <div className='align-left'>
                      <h5>
                        Friends / Followers <span>{friends.length}</span>
                      </h5>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='row merged20'>
                      <div className='col-lg-7 col-lg-7 col-sm-7'>
                        <form method='post'>
                          <input type='text' placeholder='Search Friend' />
                          <button type='submit'>
                            <i className='fa fa-search'></i>
                          </button>
                        </form>
                      </div>
                      <div className='col-lg-4 col-md-4 col-sm-4'>
                        <div className='select-options'>
                          <Select options={options} />
                        </div>
                      </div>
                      <div className='col-lg-1 col-md-1 col-sm-1'>
                        <div className='option-list'>
                          <i className='fa fa-ellipsis-v'></i>
                          <ul>
                            <li>
                              <a title='' href='#'>
                                Show Friends Public
                              </a>
                            </li>
                            <li>
                              <a title='' href='#'>
                                Show Friends Private
                              </a>
                            </li>
                            <li>
                              <a title='' href='#'>
                                Mute Notifications
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='central-meta padding30'>
              <div className='row'>
                {friends && friends.map(f=>{
                  return <div className='col-lg-3 col-md-6 col-sm-6'>
                  <div className="friend-block">
                    <div className="more-opotnz">
                      <i className="fa fa-ellipsis-h"></i>
                      <ul>
                        <li><a href='https://google.com' title="">Block</a></li>
                        <li><a href='https://google.com' title="">UnBlock</a></li>
                        <li><a href='https://google.com' title="">Mute Notifications</a></li>
                        <li><a href='https://google.com' title="">hide from friend list</a></li>
                      </ul>
                    </div>
                    <Link to={`/`}>
                      <figure className='more-opotnz_link'>
                        <img src={f.pic} alt="" />
                      </figure>
                    </Link>

                    <div className="frnd-meta">
                      <div className="frnd-name">
                        <Link to={`/`}>
                          {f.name}</Link>
                        <span>Pakistan</span>
                      </div>
                      <a className="send-mesg" href='https://google.com' title="">Message</a>
                    </div>
                  </div>
                </div>
                })}                
              </div>
              <div className='lodmore'>
                <span>Viewing 1-8 of 44 friends</span>
                <button className='btn-view btn-load-more'>
                  <i>
                  <svg width='20px' viewBox="0 0 512 512"><path d="M496 40v160C496 213.3 485.3 224 472 224h-160C298.8 224 288 213.3 288 200s10.75-24 24-24h100.5C382.8 118.3 322.5 80 256 80C158.1 80 80 158.1 80 256s78.97 176 176 176c41.09 0 81.09-14.47 112.6-40.75c10.16-8.5 25.31-7.156 33.81 3.062c8.5 10.19 7.125 25.31-3.062 33.81c-40.16 33.44-91.17 51.77-143.5 51.77C132.4 479.9 32 379.5 32 256s100.4-223.9 223.9-223.9c79.85 0 152.4 43.46 192.1 109.1V40c0-13.25 10.75-24 24-24S496 26.75 496 40z"/></svg>
                  </i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Friends
