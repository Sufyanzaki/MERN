import React, { useEffect, useState } from 'react'
import "./Followings.css"
import ToFollowUser from '../ToFollowUser/ToFollowUser';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import axios from 'axios';
import { baseURI } from '../../../utils/helper';

const Followings = () => {

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        axios.get(`${baseURI}users`, {withCredentials:true}).then((res)=>{setUsers(res.data.users)}).catch(err=>console.log(err.data))
    }, [])

    return (
        <div className="widget">
            <h4 className="widget-title">People you may know</h4>
            <ul className="followers">
                <SimpleBar style={{ maxHeight: 300 }}>
                    {users.map(u=>{
                        return <ToFollowUser user={u} key={u._id}/>
                    })}
                </SimpleBar>
            </ul>
        </div>
    )
}

export default Followings