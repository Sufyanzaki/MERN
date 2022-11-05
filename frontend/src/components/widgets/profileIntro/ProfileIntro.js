import React from 'react'
import "./ProfileIntro.css"

const ProfileIntro = () => {
    return (
        <div className="widget">
            <h4 className="widget-title">Profile intro</h4>
            <ul className="short-profile">
                <li>
                    <span>about</span>
                    <p>Hi, i am jhon kates, i am 32 years old and worked as a web
                        developer in microsoft </p>
                </li>
                <li>
                    <span>fav tv show</span>
                    <p>Sacred Games, Spartcus Blood, Games of Theron </p>
                </li>
                <li>
                    <span>favourit music</span>
                    <p>Justin Biber, Shakira, Nati Natasah</p>
                </li>
            </ul>
        </div>)
}

export default ProfileIntro