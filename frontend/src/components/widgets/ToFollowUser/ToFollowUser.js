import axios from "axios";
import React, { useState } from "react";
import { baseURI } from "../../../utils/helper";
import useLocalStorage from "../../../utils/useLocalStorage";
import Spinner from "../../Layouts/Loader/Loader";

const ToFollowUser = ({user}) => {

  const [local,setLocal] = useLocalStorage('user')
  const [loading, setLoading] = useState(false);

  const handleSubmit=(e,id)=>{
    setLoading(true);
    e.preventDefault();
    axios.get(`${baseURI}follow/${id}`, {withCredentials: true})
    .then((res)=>{setLocal(res.data.message); setLoading(false)})
    .catch(err=>console.log(err.data));
  }

  return (
    <li>
      <figure>
        <img
          src={user.pic}
          alt=""
        />
      </figure>
      <div className="friend-meta">
        <h4>
          <a href="https://www.google.com/" title="">
            {user.name}
          </a>
        </h4>
        {loading ? <Spinner/> : <a href='https://google.com' title="" className="underline">
          {local.following.includes(user._id) ? <span onClick={(e)=>{handleSubmit(e, user._id)}}>Unfollow</span> : <span onClick={(e)=>{handleSubmit(e, user._id)}}>follow</span> }
        </a>}
      </div>
    </li>
  );
};

export default ToFollowUser;
