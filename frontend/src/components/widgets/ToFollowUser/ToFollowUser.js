import React from "react";

const ToFollowUser = () => {
  return (
    <li>
      <figure>
        <img
          src=
          "https://www.smartlook.com/wp-content/uploads/2021/12/avatar_male_01.png"

          alt=""
        />
      </figure>
      <div className="friend-meta">
        <h4>
          <a href="https://www.google.com/" title="">
            prop.name
          </a>
        </h4>
        {false ? <div className="small-loader m-0" style={{ float: 'right', width: '20px', height: '20px' }}></div> : <a href='https://google.com' title="" className="underline">
          unfollow
        </a>}
      </div>
    </li>
  );
};

export default ToFollowUser;
