import axios from 'axios'
import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import './Friends.css'
import { API, config, defaultImage, upp } from '../../../utils/helper';
import { Link, useParams } from 'react-router-dom';
const Friends = () => {
    
//config
let { username } = useParams();
//hitting api
    const [state, setState] = useState([]);
    useEffect(()=>{
        axios.get(API + `get_a_list_of_all_friendships?username=${username}`, config(user.token)).then((res)=>{setState(res.data.data)})
    }, [])
  //chosen testing zone
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  return (

      <div className='col-lg-12'>
      <div className='central-meta'>
        <div className='title-block'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='align-left'>
                <h5>
                  Friends / Followers <span>{state.length}</span>
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
          {state && state.map((p)=>{
            return(
                <>
                  <div className='col-lg-3 col-md-6 col-sm-6'>
                  <div className="friend-block">
												<div className="more-opotnz">
													<i className="fa fa-ellipsis-h"></i>
													<ul>
														<li><a href="#" title="">Block</a></li>
														<li><a href="#" title="">UnBlock</a></li>
														<li><a href="#" title="">Mute Notifications</a></li>
														<li><a href="#" title="">hide from friend list</a></li>
													</ul>
												</div>
												<Link to={`/${p.username}`}>
                          <figure className='more-opotnz_link'>
                            <img src={p.photo === null ? defaultImage:upp + p.photo} alt="" />
                          </figure>
                        </Link>
												
												<div className="frnd-meta">
													<div className="frnd-name">
                          <Link to={`/${p.username}`}>
                            {p.name}</Link>
														{p.country && <span>{p.country}</span>}
													</div>
													<a className="send-mesg" href="#" title="">Message</a>
												</div>
                  </div>
                  </div>
                </>
            )
          })}
        </div>
        <div className='lodmore'>
          <span>Viewing 1-8 of 44 friends</span>
          <button className='btn-view btn-load-more'><i className="fa-light fa-arrow-rotate-right" style={{color:'black', fontSize:'20px'}}></i></button>
        </div>
      </div>
    </div>
  )
}

export default Friends
