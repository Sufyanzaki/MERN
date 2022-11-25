import React, { useCallback, useEffect, useState } from "react";
import "./header.css";
import { images, flags } from "../../../utils/imageParser";
import { Link } from "react-router-dom";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import Panel from "./Panel/Panel";
import SidebarRight from "./Right/SidebarRight";
import SidebarLeft from "./Left/SidebarLeft";
import axios from "axios";
import { baseURI } from "../../../utils/helper";
import { useSelector } from "react-redux";
import TimeAgo from 'react-timeago'
import englishString from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import useLocalStorage from "../../../utils/useLocalStorage";

const Header = ({ newPic }) => {

  const [local, setLocal] = useLocalStorage('user')


  const { user } = useSelector(state => state.user)
  const formatter = buildFormatter(englishString)

  const [helpDrop, setHelpDrop] = useState({ active: false, class: "" });
  const [langDrop, setLangDrop] = useState({ active: false, class: "" });
  const [comment, setComment] = useState({ active: false, class: "" });
  const [notification, setNotification] = useState({
    active: false,
    class: "",
  });
  const [home, setHome] = useState({ active: false, class: "" });
  const [setting, setSetting] = useState({ active: false, class: "" });
  const [chatBox, setChatBox] = useState({ active: false, class: "" });
  const [leftSlide, setLeftSlide] = useState({ active: false, class: "" });
  const [userSetting, setUserSetting] = useState({ active: false, class: "" });
  const [notiCol, setNotiCol] = useState([])

  const handleUserSetting = (e) => {
    e.preventDefault()
    if (userSetting.active) {
      setUserSetting({ active: false, class: "" });
    } else {
      setUserSetting({ active: true, class: "active" });
      setHelpDrop({ active: false, class: "" });
      setComment({ active: false, class: "" });
      setNotification({ active: false, class: "" });
      setHome({ active: false, class: "" });
      setSetting({ active: false, class: "" });
      setChatBox({ active: false, class: "" });
    }
  };

  const handleLeftSlide = (e) => {
    e.preventDefault()
    if (leftSlide.active) {
      setLeftSlide({ active: false, class: "" });
    } else {
      setLeftSlide({ active: true, class: "open" });
      setLangDrop({ active: false, class: "" });
      setComment({ active: false, class: "" });
      setNotification({ active: false, class: "" });
      setHome({ active: false, class: "" });
      setSetting({ active: false, class: "" });
    }
  };

  const handleChat = (e) => {
    e.preventDefault()
    if (helpDrop.active) {
      setChatBox({ active: true, class: "show" });
    } else {
      setChatBox({ active: true, class: "show" });
      setHelpDrop({ active: false, class: "" });
      setLangDrop({ active: false, class: "" });
      setComment({ active: false, class: "" });
      setNotification({ active: false, class: "" });
      setHome({ active: false, class: "" });
      setSetting({ active: false, class: "" });
      setLeftSlide({ active: false, class: "" });
    }
  };

  const handleHelp = (e) => {
    e.preventDefault()
    if (helpDrop.active) {
      setHelpDrop({ active: false, class: "" });
    } else {
      setHelpDrop({ active: true, class: "active" });
      setLangDrop({ active: false, class: "" });
      setComment({ active: false, class: "" });
      setNotification({ active: false, class: "" });
      setHome({ active: false, class: "" });
      setSetting({ active: false, class: "" });
      setLeftSlide({ active: false, class: "" });
    }
  };

  const handleLang = (e) => {
    e.preventDefault()
    if (langDrop.active) {
      setLangDrop({ active: false, class: "" });
    } else {
      setHelpDrop({ active: false, class: "" });
      setComment({ active: false, class: "" });
      setNotification({ active: false, class: "" });
      setHome({ active: false, class: "" });
      setSetting({ active: false, class: "" });
      setLangDrop({ active: true, class: "active" });
      setLeftSlide({ active: false, class: "" });
    }
  };

  const handleComment = (e) => {
    e.preventDefault()
    if (comment.active) {
      setComment({ active: false, class: "" });
    } else {
      setComment({ active: true, class: "active" });
      setLangDrop({ active: true, class: "" });
      setHelpDrop({ active: true, class: "" });
      setNotification({ active: false, class: "" });
      setHome({ active: false, class: "" });
      setSetting({ active: false, class: "" });
      setLeftSlide({ active: false, class: "" });
    }
  };

  const handleNotification = (e) => {
    e.preventDefault()
    if (notification.active) {
      setNotification({ active: false, class: "" });
    } else {
      setNotification({ active: true, class: "active" });
      setLangDrop({ active: true, class: "" });
      setHelpDrop({ active: true, class: "" });
      setComment({ active: false, class: "" });
      setHome({ active: false, class: "" });
      setSetting({ active: false, class: "" });
      setLeftSlide({ active: false, class: "" });
    }
  };

  const handleHome = (e) => {
    e.preventDefault()
    if (home.active) {
      setHome({ active: false, class: "" });
    } else {
      setHome({ active: true, class: "active" });
      setLangDrop({ active: false, class: "" });
      setHelpDrop({ active: false, class: "" });
      setComment({ active: false, class: "" });
      setNotification({ active: false, class: "" });
      setSetting({ active: false, class: "" });
      setLeftSlide({ active: false, class: "" });
    }
  };

  const handleSetting = (e) => {
    e.preventDefault()
    if (setting.active) {
      setSetting({ active: false, class: "" });
    } else {
      setHome({ active: false, class: "" });
      setLangDrop({ active: false, class: "" });
      setHelpDrop({ active: true, class: "" });
      setComment({ active: false, class: "" });
      setNotification({ active: false, class: "" });
      setSetting({ active: true, class: "active" });
      setLeftSlide({ active: false, class: "" });
    }
  };

  const chatFun = useCallback((data) => {
    setChatBox(data)
  }, [chatBox])

  const [search, setSearch] = useState('');
  const [searchCollection, setSearchCollection] = useState(null)

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    axios.post(`${baseURI}search`, { name: search }, { withCredentials: true }).then(res => setSearchCollection(res.data.user)).catch(err => console.log(err))
  }, [])

  //getting all notifications
  useEffect(() => {
    axios.get(`${baseURI}notifications`, { withCredentials: true }).then(res => {
      setNotiCol(res.data.notifications)
    }).catch(err => console.log(err))
  }, [notification])

  return (
    <>
      {/* <!-- responsive header --> */}
      <div className="topbar-container">
        <div className="topbar stick">
          <div className="logo">
            <Link title="" to={"/"}>
              <img src={images['qbox-logo-white.png']} alt="" />
            </Link>
          </div>
          <div className="top-area">
            <div className="main-menu">
              <span></span>
            </div>
            <div className="top-search">
              <form onSubmit={handleSearch}>
                <input
                  name="searchBox"
                  type="text"
                  placeholder="Search People, Pages, Groups etc"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value) }}
                />
                <button data-ripple>
                  <i className="ti-search">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-search"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </i>
                </button>
              </form>

              {searchCollection && searchCollection.map(s => {
                return <Link to={`/profile/${s._id}`} className="searchedUser" key={s._id} onClick={() => {
                  setSearchCollection(null)
                  setSearch('')
                }}>
                  <div className="searchUser">
                    <img src={s.pic} alt='' />
                    <div className="search-user_body">
                      <strong>{s.name}</strong>
                      <em>{s.email}</em>
                    </div>
                  </div>
                </Link>
              })}

            </div>
            <div className="page-name">
              <span>Newsfeed</span>
            </div>
            <ul className="setting-area">
              <li>
                <Link to={"/"} title="Home" data-ripple="">
                  <svg viewBox="0 0 512 512"><path d="M223.1 224C223.1 188.7 252.7 160 288 160C323.3 160 352 188.7 352 224C352 259.3 323.3 288 288 288C252.7 288 223.1 259.3 223.1 224zM288 256C305.7 256 320 241.7 320 224C320 206.3 305.7 192 288 192C270.3 192 255.1 206.3 255.1 224C255.1 241.7 270.3 256 288 256zM207.1 400C207.1 408.8 200.8 416 191.1 416C183.2 416 175.1 408.8 175.1 400V392C175.1 352.2 208.2 320 247.1 320H328C367.8 320 400 352.2 400 392V400C400 408.8 392.8 416 384 416C375.2 416 368 408.8 368 400V392C368 369.9 350.1 352 328 352H247.1C225.9 352 207.1 369.9 207.1 392V400zM277.4 4.002C283.5-1.334 292.5-1.334 298.6 4.002L570.6 244C577.2 249.8 577.8 259.1 571.1 266.6C566.2 273.2 556 273.8 549.4 267.1L512 234.1V432C512 476.2 476.2 512 432 512H144C99.82 512 64 476.2 64 432V234.1L26.59 267.1C19.96 273.8 9.849 273.2 4.003 266.6C-1.844 259.1-1.212 249.8 5.414 244L277.4 4.002zM96 206.7V432C96 458.5 117.5 480 144 480H432C458.5 480 480 458.5 480 432V206.7L288 37.34L96 206.7z" /></svg>
                  <svg></svg>
                </Link>
              </li>

              {true && <>
                <li>
                  <a
                    href="https://www.google.com"
                    title="Friend Requests"
                    data-ripple=""
                    onClick={handleHome}
                  >
                    <svg className={home.class} viewBox="0 0 512 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM224 32c52.94 0 96 43.06 96 96c0 52.93-43.06 96-96 96S128 180.9 128 128C128 75.06 171.1 32 224 32zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM413.3 480H34.66C33.2 480 32 478.8 32 477.3C32 399.4 95.4 336 173.3 336h101.3C352.6 336 416 399.4 416 477.3C416 478.8 414.8 480 413.3 480z" /></svg>
                    <em className="bg-red">1</em>
                    <svg className={home.class} viewBox="0 0 512 512" width="10px"><path d="M506.3 417l-213.3-364C284.8 39 270.4 32 255.1 32S227.2 39 218.1 53l-213.2 364c-16.33 27.89 4.109 63 36.1 63H469.3C502.1 480 522.6 445 506.3 417zM478.7 442.7C477.5 444.7 474.8 448 469.3 448H42.74c-5.531 0-8.258-3.318-9.393-5.295c-1.258-2.195-2.277-5.633 .0059-9.531L246.5 69.21C249.2 64.68 253.6 64 255.1 64c2.363 0 6.715 .6641 9.348 5.18l213.3 363.9C480.9 437.1 479.9 440.5 478.7 442.7z" /></svg>
                  </a>
                  <div className={`dropdowns ${home.class}`}>
                    <SimpleBar style={{ maxHeight: 300 }}>
                      <span className="space-bw_span">
                        1 New Requests
                        <Link to={"/notifications"} title="" onClick={() => { setHome({ active: false, class: '' }) }}>
                          View all Requests
                        </Link>
                      </span>
                      <ul className="drops-menu">
                        <li>
                          <div>
                            <Link to={`/`} onClick={() => { setHome({ active: false, class: '' }) }}>
                              <figure className="circular-image">
                                <img src={''} alt="" />
                              </figure>
                            </Link>
                            <div className="mesg-meta">
                              <h6>
                                <Link to={`/`} title="" onClick={() => { setHome({ active: false, class: '' }) }}>
                                  n.data.name
                                </Link>
                              </h6>
                              <span>
                                <b>n.data.name</b> sent you a friend request
                              </span>
                              <i>n.data.created_at</i>
                            </div>
                            <div className="add-del-friends">
                              <Link to={"/"} title="">
                                <svg viewBox="0 0 512 512"><path d="M462.3 62.71c-54.5-46.5-136.1-38.99-186.6 13.27l-19.69 20.61l-19.71-20.61C195.6 33.85 113.3 8.71 49.76 62.71C-13.11 116.2-16.31 212.5 39.81 270.5l193.2 199.7C239.3 476.7 247.8 480 255.9 480c8.25 0 16.33-3.25 22.58-9.751l193.6-199.8C528.5 212.5 525.1 116.2 462.3 62.71zM449.3 248.2l-192.9 199.9L62.76 248.2C24.39 208.7 16.39 133.2 70.51 87.09C125.3 40.21 189.8 74.22 213.3 98.59l42.75 44.13l42.75-44.13c23.13-24 88.13-58 142.8-11.5C495.5 133.1 487.6 208.6 449.3 248.2z" /></svg>
                              </Link>
                              <Link to={"/"} title="">
                                <svg viewBox="0 0 448 512"><path d="M432 64h-96l-33.63-44.75C293.4 7.125 279.1 0 264 0h-80C168.9 0 154.6 7.125 145.6 19.25L112 64h-96C7.201 64 0 71.2 0 80c0 8.799 7.201 16 16 16h416c8.801 0 16-7.201 16-16C448 71.2 440.8 64 432 64zM152 64l19.25-25.62C174.3 34.38 179 32 184 32h80c5 0 9.75 2.375 12.75 6.375L296 64H152zM400 128C391.2 128 384 135.2 384 144v288c0 26.47-21.53 48-48 48h-224C85.53 480 64 458.5 64 432v-288C64 135.2 56.84 128 48 128S32 135.2 32 144v288C32 476.1 67.89 512 112 512h224c44.11 0 80-35.89 80-80v-288C416 135.2 408.8 128 400 128zM144 416V192c0-8.844-7.156-16-16-16S112 183.2 112 192v224c0 8.844 7.156 16 16 16S144 424.8 144 416zM240 416V192c0-8.844-7.156-16-16-16S208 183.2 208 192v224c0 8.844 7.156 16 16 16S240 424.8 240 416zM336 416V192c0-8.844-7.156-16-16-16S304 183.2 304 192v224c0 8.844 7.156 16 16 16S336 424.8 336 416z" /></svg>
                              </Link>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <Link
                        to={"/notifications"}
                        title=""
                        className="more-mesg"
                        onClick={() => {
                          setHome({ active: false, class: '' })
                        }}
                      >
                        View All
                      </Link>
                    </SimpleBar>
                  </div>
                </li>
                <li>
                  <a
                    href="https://www.google.com"
                    title="Notification"
                    data-ripple=""
                    onClick={handleNotification}
                  >
                    <svg className={notification.class} viewBox="0 0 512 512"><path d="M207.1 16C207.1 7.164 215.2 0 223.1 0C232.8 0 240 7.164 240 16V32.79C320.9 40.82 384 109 384 192V221.1C384 264.8 401.4 306.7 432.3 337.7L435 340.4C443.3 348.7 448 359.1 448 371.7C448 396.2 428.2 416 403.7 416H44.28C19.83 416 0 396.2 0 371.7C0 359.1 4.666 348.7 12.97 340.4L15.72 337.7C46.63 306.7 64 264.8 64 221.1V192C64 109 127.1 40.82 208 32.79L207.1 16zM223.1 64C153.3 64 95.1 121.3 95.1 192V221.1C95.1 273.3 75.26 323.4 38.35 360.3L35.6 363C33.29 365.3 31.1 368.5 31.1 371.7C31.1 378.5 37.5 384 44.28 384H403.7C410.5 384 416 378.5 416 371.7C416 368.5 414.7 365.3 412.4 363L409.7 360.3C372.7 323.4 352 273.3 352 221.1V192C352 121.3 294.7 64 223.1 64H223.1zM223.1 480C237.9 480 249.8 471.1 254.2 458.7C257.1 450.3 266.3 445.1 274.6 448.9C282.9 451.9 287.3 461 284.4 469.3C275.6 494.2 251.9 512 223.1 512C196.1 512 172.4 494.2 163.6 469.3C160.7 461 165.1 451.9 173.4 448.9C181.7 445.1 190.9 450.3 193.8 458.7C198.2 471.1 210.1 480 223.1 480z" /></svg>
                    <em className="bg-purple">7</em>
                    <svg className={notification.class} viewBox="0 0 512 512" width="10px"><path d="M506.3 417l-213.3-364C284.8 39 270.4 32 255.1 32S227.2 39 218.1 53l-213.2 364c-16.33 27.89 4.109 63 36.1 63H469.3C502.1 480 522.6 445 506.3 417zM478.7 442.7C477.5 444.7 474.8 448 469.3 448H42.74c-5.531 0-8.258-3.318-9.393-5.295c-1.258-2.195-2.277-5.633 .0059-9.531L246.5 69.21C249.2 64.68 253.6 64 255.1 64c2.363 0 6.715 .6641 9.348 5.18l213.3 363.9C480.9 437.1 479.9 440.5 478.7 442.7z" /></svg>
                  </a>
                  <div className={`dropdowns ${notification.class}`}>
                    <span>
                      {notiCol.length} New Notifications
                      <Link to={"/"} title="">
                        Mark all as read
                      </Link>
                    </span>
                    <SimpleBar style={{ maxHeight: 300 }}>
                      <ul className="drops-menu">
                        {notiCol && notiCol.map(n => {
                          return (<li>
                            <Link to={"/"} title="">
                              <figure>
                                <img style={{ width: '40px', height: '40px' }} src={n.user.pic} alt="" />
                                <span className="status f-online"></span>
                              </figure>
                              <div className="mesg-meta">
                                <h6>{n.user.name}</h6>
                                {(() => {

                                  if (n.action === 'following') {
                                    return (
                                     <span>You started following {n.user.name}</span>
                                    )
                                  }
                                  else if (n.action === 'sentRequest') {
                                    return (
                                      <span>You sent a friend request to {n.user.name}</span>
                                    )
                                  }
                                  else if (n.action === 'receivedRequest') {
                                    return (
                                      <span>You received a friend request from {n.user.name}</span>
                                    )
                                  }
                                  else if (n.action === 'followed') {
                                    return (
                                      <span>{n.user.name} started following you</span>
                                    )
                                  }
                                  else {
                                    return <span></span>
                                  }

                                })()}
                                <i> <TimeAgo date={n.createdAt} formatter={formatter} /></i>
                              </div>
                            </Link>
                          </li>)
                        })}
                        <li>
                          <Link to={"/notifications.html"} title="">
                            <figure>
                              <img src={images["thumb-2.jpg"]} alt="" />
                              <span className="status f-online"></span>
                            </figure>
                            <div className="mesg-meta">
                              <h6>Jhon doe</h6>
                              <span>
                                Nicholas Grissom just became friends. Write on his
                                wall.
                              </span>
                              <i>4 hours ago</i>
                              <figure>
                                <span>
                                  Today is Marina Valentine’s Birthday! wish for
                                  celebrating
                                </span>
                                <img src={images['birthday.png']} alt="" />
                              </figure>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </SimpleBar>
                    <Link to={"/"} title="" className="more-mesg">
                      View All
                    </Link>
                  </div>
                </li>
                <li>
                  <a
                    href="https://www.google.com"
                    title="Messages"
                    onClick={handleComment}
                    data-ripple=""
                  >
                    <svg className={comment.class} viewBox="0 0 512 512"><path d="M256 64c123.5 0 223.1 79 223.1 176S379.5 416 256 416c-28.25 0-56.24-4.25-83.24-12.75c-9.516-3.068-19.92-1.459-28.07 4.338c-22.1 16.25-58.54 35.29-102.7 39.66c11.1-15.12 29.75-40.5 40.74-69.62l.1287-.3388c4.283-11.27 1.79-23.1-6.429-32.82C47.51 313.1 32.06 277.6 32.06 240C32.06 143 132.6 64 256 64zM256 32C114.7 32 .0272 125.1 .0272 240c0 47.63 19.92 91.25 52.91 126.2c-14.87 39.5-45.87 72.88-46.37 73.25c-6.624 7-8.374 17.25-4.625 26C5.817 474.2 14.38 480 24 480c61.49 0 109.1-25.75 139.1-46.25C192.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32z" /></svg>
                    <em className="bg-blue">9</em>
                    <svg className={comment.class} viewBox="0 0 512 512" width="10px"><path d="M506.3 417l-213.3-364C284.8 39 270.4 32 255.1 32S227.2 39 218.1 53l-213.2 364c-16.33 27.89 4.109 63 36.1 63H469.3C502.1 480 522.6 445 506.3 417zM478.7 442.7C477.5 444.7 474.8 448 469.3 448H42.74c-5.531 0-8.258-3.318-9.393-5.295c-1.258-2.195-2.277-5.633 .0059-9.531L246.5 69.21C249.2 64.68 253.6 64 255.1 64c2.363 0 6.715 .6641 9.348 5.18l213.3 363.9C480.9 437.1 479.9 440.5 478.7 442.7z" /></svg>
                  </a>
                  <div className={`dropdowns ${comment.class}`}>
                    <SimpleBar style={{ maxHeight: 300 }}>
                      <span className='space-bw_span'>
                        5 New Messages
                        <Link to={"/"} title="">
                          Mark all as read
                        </Link>
                      </span>
                      <ul className="drops-menu">
                        <li>
                          <Link to={"/"} className="show-mesg" title="">
                            <figure>
                              <img src={images["thumb-1.jpg"]} alt="" />
                              <span className="status f-online"></span>
                            </figure>
                            <div className="mesg-meta">
                              <h6>sarah Loren</h6>
                              <span>
                                <i className="ti-check"></i> Hi, how r u dear ...?
                              </span>
                              <i>2 min ago</i>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/"} className="show-mesg" title="">
                            <figure>
                              <img src={images["thumb-2.jpg"]} alt="" />
                              <span className="status f-offline"></span>
                            </figure>
                            <div className="mesg-meta">
                              <h6>Jhon doe</h6>
                              <span>
                                <i className="ti-check"></i> We’ll have to check that
                                at the office and see if the client is on board with
                              </span>
                              <i>2 min ago</i>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/"} className="show-mesg" title="">
                            <figure>
                              <img src={images["thumb-3.jpg"]} alt="" />
                              <span className="status f-online"></span>
                            </figure>
                            <div className="mesg-meta">
                              <h6>Andrew</h6>
                              <span>
                                {" "}
                                <i className="fa fa-paperclip"></i>Hi Jack's! It’s
                                Diana, I just wanted to let you know that we have to
                                reschedule..
                              </span>
                              <i>2 min ago</i>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/"} className="show-mesg" title="">
                            <figure>
                              <img src={images["thumb-3.jpg"]} alt="" />
                              <span className="status f-away"></span>
                            </figure>
                            <div className="mesg-meta">
                              <h6>Amy</h6>
                              <span>
                                <i className="fa fa-paperclip"></i> Sed ut
                                perspiciatis unde omnis iste natus error sit{" "}
                              </span>
                              <i>2 min ago</i>
                            </div>
                          </Link>
                          <span className="tag">New</span>
                        </li>
                      </ul>
                      <Link to={"/"} title="" className="more-mesg">
                        View All
                      </Link>
                    </SimpleBar>
                  </div>
                </li>
              </>}

              <li>
                <a href="https://www.google.com" onClick={handleLang} title="Languages" data-ripple="">
                  <svg className={langDrop.class} viewBox="0 0 512 512"><path d="M288 0C146.6 0 32 114.6 32 256s114.6 256 256 256s256-114.6 256-256S429.4 0 288 0zM490.1 160h-27.85c-17.32 0-30.85 14.62-30.85 32v8l-12.99 4.625c-2.664 .5-8.355 .75-15.02 1c-32.33 1.5-46.86 2.625-52.92 14.62c-2.504 6.342-1.742 13.51 2.039 19.18L364.9 258C370.7 266.8 380.5 272 391 272h8.355v8l-19.38 27.62c-2.785 3.875-4.723 8.25-5.57 13l-4.238 22.5c-10.41 9.5-19.62 20.38-27.49 32.13l-12.96 19.5c-4.721 7-16.59 6.377-20.34-1.25c-4.359-8.75-6.66-18.38-6.66-28.12V335.5c0-17.4-14.1-31.5-31.5-31.5H245.4c-10.29 0-19.98-4-27.25-11.25C210.8 285.4 206.7 275.8 206.7 265.4V251.3c0-12.18 5.744-23.64 15.5-30.93l27.61-20.62c5.051-3.824 22.48-13.16 41.29-3.625l14.77 7.375c12.07 5.826 22.17 2.248 23.98 1.625l47.35-15.75c12.84-4.25 21.55-16.38 21.55-29.88C398.8 142.1 384.6 128 367.3 128l-9.809 .125l-6.902-6.875C344.6 115.3 335.9 112 327.4 112h-88C238.1 101.1 258.3 111.4 271.4 91.88L279 80h40.37V34.46C394.9 45.13 458.4 93.5 490.1 160zM288 480c-123.5 0-224-100.5-224-224c0-123.3 100.2-223.6 223.4-223.1V48C271.9 47.39 256.7 55.61 252.1 62.7L244.5 74.58l-13.88 2.998C215.8 81.28 204.3 94.3 207.1 116.5C209.1 132.5 223.3 144 239.4 144h89.1l6.422 6.797c6.002 5.979 14.12 9.328 22.58 9.328c.1367 0 10.22-.127 10.22-.127L319.8 174.8l-14.36-7.266C295.9 162.7 284.8 160.1 273.7 160.1c-15.74 0-31.06 5.037-43.14 14.18l-27.45 20.5C185.3 208 174.7 229.2 174.7 251.4v14c0 18.66 7.311 36.36 20.59 49.83C208.8 328.7 226.5 336 245.4 336h25.91l-.5156 29.38c0 14.58 3.465 29.24 10.02 42.39C287.1 422.4 302.4 432 319.4 432c14.7 0 28.88-7.465 36.9-19.35l13.08-19.69c6.559-9.789 14.12-18.64 22.4-26.19c5.129-4.678 8.596-10.9 9.881-17.72l4.238-22.5l18.59-24.82c4.24-5.641 6.498-12.53 6.42-19.58l-.1211-11c-.0977-8.783-3.799-17.14-10.24-23.11c-5.934-5.502-21.71-8.535-29.76-8.535c-4.768 0 33.05-3.336 33.52-3.424c3.137-.5879 6.17-1.645 8.996-3.131L445.9 226.3c10.9-5.732 18.13-17.21 17.68-29.51L463.4 192l39.19 .0371C508.6 212.3 512 233.8 512 256C512 379.5 411.5 480 288 480z" /></svg>
                  <em>EN</em>
                </a>
                <div className={`dropdowns languages ${langDrop.class}`}>
                  <SimpleBar style={{ maxHeight: 300 }}>
                    <div data-gutter="10" className="row">
                      <div className="col-md-3">
                        <ul className="dropdown-meganav-select-list-lang">
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["UK.png"]}
                              />
                              English(UK)
                            </Link>
                          </li>
                          <li className="active">
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["US.png"]}
                              />
                              English(US)
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["DE.png"]}
                              />
                              Deutsch
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["NED.png"]}
                              />
                              Nederlands
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["FR.png"]}
                              />
                              Français
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["SP.png"]}
                              />
                              Español
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["ARG.png"]}
                              />
                              Español (AR)
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["IT.png"]}
                              />
                              Italiano
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["PT.png"]}
                              />
                              Português (PT)
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["BR.png"]}
                              />
                              Português (BR)
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-3">
                        <ul className="dropdown-meganav-select-list-lang">
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["FIN.png"]}
                              />
                              Suomi
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["SW.png"]}
                              />
                              Svenska
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["DEN.png"]}
                              />
                              Dansk
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["CZ.png"]}
                              />
                              Čeština
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["HUN.png"]}
                              />
                              Magyar
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["ROM.png"]}
                              />
                              Română
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["JP.png"]}
                              />
                              日本語
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["CN.png"]}
                              />
                              简体中文
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["PL.png"]}
                              />
                              Polski
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["GR.png"]}
                              />
                              Ελληνικά
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-3">
                        <ul className="dropdown-meganav-select-list-lang">
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["TUR.png"]}
                              />
                              Türkçe
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["BUL.png"]}
                              />
                              Български
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["ARB.png"]}
                              />
                              العربية
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="QBOX"
                                src={flags["KOR.png"]}
                              />
                              한국어
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["ISR.png"]}
                              />
                              עברית
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["LAT.png"]}
                              />
                              Latviski
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["UKR.png"]}
                              />
                              Українська
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["IND.png"]}
                              />
                              Bahasa Indonesia
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["MAL.png"]}
                              />
                              Bahasa Malaysia
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["TAI.png"]}
                              />
                              ภาษาไทย
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-3">
                        <ul className="dropdown-meganav-select-list-lang">
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["CRO.png"]}
                              />
                              Hrvatski
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["LIT.png"]}
                              />
                              Lietuvių
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["SLO.png"]}
                              />
                              Slovenčina
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["SERB.png"]}
                              />
                              Srpski
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["SLOVE.png"]}
                              />
                              Slovenščina
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["NAM.png"]}
                              />
                              Tiếng Việt
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["PHI.png"]}
                              />
                              Filipino
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["ICE.png"]}
                              />
                              Íslenska
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["EST.png"]}
                              />
                              Eesti
                            </Link>
                          </li>
                          <li>
                            <Link to={"/"}>
                              <img
                                title="Image Title"
                                alt="Alternative text"
                                src={flags["RU.png"]}
                              />
                              Русский
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </SimpleBar>
                </div>
              </li>
              <li>
                <a href="https://www.google.com" onClick={handleHelp} title="Help" data-ripple="">
                  <svg className={helpDrop.class} viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 480c-123.5 0-224-100.5-224-224s100.5-224 224-224s224 100.5 224 224S379.5 480 256 480zM240 344c-13.25 0-24 10.75-24 24s10.75 24 24 24s24-10.75 24-24S253.3 344 240 344zM285.6 128H226.4C189.8 128 160 157.8 160 194.4V204c0 8.844 7.156 16 16 16S192 212.8 192 204V194.4C192 175.4 207.4 160 226.4 160h59.25C304.6 160 320 175.4 320 194.4c0 12.48-6.781 24-17.06 29.72L242.5 254.3C231.1 260.7 224 272.7 224 285.8V304C224 312.8 231.2 320 240 320S256 312.8 256 304V285.8c0-1.453 .7813-2.797 1.438-3.172l60.41-30.22C338.9 240.7 352 218.5 352 194.4C352 157.8 322.2 128 285.6 128z" /></svg>
                  <svg className={helpDrop.class} viewBox="0 0 512 512" width="10px"><path d="M506.3 417l-213.3-364C284.8 39 270.4 32 255.1 32S227.2 39 218.1 53l-213.2 364c-16.33 27.89 4.109 63 36.1 63H469.3C502.1 480 522.6 445 506.3 417zM478.7 442.7C477.5 444.7 474.8 448 469.3 448H42.74c-5.531 0-8.258-3.318-9.393-5.295c-1.258-2.195-2.277-5.633 .0059-9.531L246.5 69.21C249.2 64.68 253.6 64 255.1 64c2.363 0 6.715 .6641 9.348 5.18l213.3 363.9C480.9 437.1 479.9 440.5 478.7 442.7z" /></svg>
                </a>
                <div className={`dropdowns helps ${helpDrop.class}`}>
                  <span>Quick Help</span>
                  <form method="post">
                    <input type="text" placeholder="How can we help you?" />
                  </form>
                  <span>Help with this page</span>
                  <ul className="help-drop">
                    <li>
                      <Link to={"/"} title="">
                        <svg viewBox="0 0 512 512"><path d="M448 368v-320C448 21.49 426.5 0 400 0h-320C35.82 0 0 35.82 0 80V448c0 35.35 28.65 64 64 64h368c8.844 0 16-7.156 16-16S440.8 480 432 480H416v-66.95C434.6 406.4 448 388.8 448 368zM32 80C32 53.49 53.49 32 80 32H96v352H64c-11.71 0-22.55 3.389-32 8.9V80zM384 480H64c-17.64 0-32-14.36-32-32s14.36-32 32-32h320V480zM400 384H128V32h272C408.8 32 416 39.17 416 48v320C416 376.8 408.8 384 400 384zM352 128H192C183.2 128 176 135.2 176 144S183.2 160 192 160h160c8.844 0 16-7.156 16-16S360.8 128 352 128zM352 224H192C183.2 224 176 231.2 176 240S183.2 256 192 256h160c8.844 0 16-7.156 16-16S360.8 224 352 224z" /></svg>Community & Forum
                      </Link>
                    </li>
                    <li>
                      <Link to={"/"} title="">
                        <svg viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 480c-123.5 0-224-100.5-224-224s100.5-224 224-224s224 100.5 224 224S379.5 480 256 480zM240 344c-13.25 0-24 10.75-24 24s10.75 24 24 24s24-10.75 24-24S253.3 344 240 344zM285.6 128H226.4C189.8 128 160 157.8 160 194.4V204c0 8.844 7.156 16 16 16S192 212.8 192 204V194.4C192 175.4 207.4 160 226.4 160h59.25C304.6 160 320 175.4 320 194.4c0 12.48-6.781 24-17.06 29.72L242.5 254.3C231.1 260.7 224 272.7 224 285.8V304C224 312.8 231.2 320 240 320S256 312.8 256 304V285.8c0-1.453 .7813-2.797 1.438-3.172l60.41-30.22C338.9 240.7 352 218.5 352 194.4C352 157.8 322.2 128 285.6 128z" /></svg>FAQs
                      </Link>
                    </li>
                    <li>
                      <Link to={"/"} title="">
                        <svg viewBox="0 0 512 512"><path d="M80 104C80 90.75 90.75 80 104 80H152C165.3 80 176 90.75 176 104V152C176 165.3 165.3 176 152 176H104C90.75 176 80 165.3 80 152V104zM112 112V144H144V112H112zM280 80C293.3 80 304 90.75 304 104V152C304 165.3 293.3 176 280 176H232C218.7 176 208 165.3 208 152V104C208 90.75 218.7 80 232 80H280zM272 144V112H240V144H272zM80 232C80 218.7 90.75 208 104 208H152C165.3 208 176 218.7 176 232V280C176 293.3 165.3 304 152 304H104C90.75 304 80 293.3 80 280V232zM112 240V272H144V240H112zM280 208C293.3 208 304 218.7 304 232V280C304 293.3 293.3 304 280 304H232C218.7 304 208 293.3 208 280V232C208 218.7 218.7 208 232 208H280zM272 272V240H240V272H272zM48 512C21.49 512 0 490.5 0 464V48C0 21.49 21.49 0 48 0H336C362.5 0 384 21.49 384 48V464C384 490.5 362.5 512 336 512H48zM32 48V464C32 472.8 39.16 480 48 480H128V432C128 396.7 156.7 368 192 368C227.3 368 256 396.7 256 432V480H336C344.8 480 352 472.8 352 464V48C352 39.16 344.8 32 336 32H48C39.16 32 32 39.16 32 48zM224 480V432C224 414.3 209.7 400 192 400C174.3 400 160 414.3 160 432V480H224z" /></svg>Carrers
                      </Link>
                    </li>
                    <li>
                      <Link to={"/"} title="">
                        <svg viewBox="0 0 448 512"><path d="M326.5 139.9C318.6 131.1 308.3 128 297.9 128c-10.36 0-20.72 3.951-28.63 11.86L120.4 288.8c-4.836 4.836-8.174 10.9-9.67 17.57c-4.738 21.13-14.53 67.08-14.53 67.08C94.97 379.5 99.83 384 104.9 384c.5605 0 1.123-.0527 1.68-.166c0 0 45.95-9.795 67.07-14.54c6.676-1.496 12.74-4.834 17.57-9.67l148.9-148.9c15.82-15.81 15.82-41.46 .0039-57.28L326.5 139.9zM317.5 188.1L168.6 337c-.5527 .5508-1.188 .9023-1.951 1.074c-8.197 1.838-20.15 4.443-31.67 6.932c2.49-11.53 5.094-23.48 6.932-31.67C142.1 312.6 142.5 311.9 143 311.4l148.9-148.9C293.1 160.4 296.3 160 297.9 160c1.607 0 3.953 .4316 6.008 2.488l13.61 13.61C320.8 179.4 320.8 184.8 317.5 188.1zM384 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96C448 60.65 419.3 32 384 32zM416 416c0 17.64-14.36 32-32 32H64c-17.64 0-32-14.36-32-32V96c0-17.64 14.36-32 32-32h320c17.64 0 32 14.36 32 32V416z" /></svg>Terms & Policy
                      </Link>
                    </li>
                    <li>
                      <Link to={"/"} title="">
                        <svg viewBox="0 0 512 512"><path d="M192 0C85.97 0 0 85.97 0 192c0 77.41 26.97 99.03 172.3 309.7C177 508.6 184.5 512 192 512s14.95-3.441 19.72-10.32C357 291 384 269.4 384 192C384 85.97 298 0 192 0zM192 473.9C51.93 271.4 32 255.1 32 192c0-88.22 71.78-160 160-160s160 71.78 160 160C352 255.9 332.6 270.7 192 473.9zM192 111.1c-44.18 0-80 35.82-80 80S147.8 271.1 192 271.1c44.18 0 80-35.82 80-80S236.2 111.1 192 111.1zM192 239.1c-26.47 0-48-21.53-48-48S165.5 143.1 192 143.1s48 21.53 48 48S218.5 239.1 192 239.1z" /></svg>Contact
                      </Link>
                    </li>
                    <li>
                      <Link to={"/"} title="">
                        <svg viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 480c-123.5 0-224-100.5-224-224s100.5-224 224-224s224 100.5 224 224S379.5 480 256 480zM256 304c8.844 0 16-7.156 16-16V128c0-8.844-7.156-16-16-16S240 119.2 240 128v160C240 296.8 247.2 304 256 304zM256 344c-13.25 0-24 10.75-24 24s10.75 24 24 24s24-10.75 24-24S269.3 344 256 344z" /></svg>Report
                        a Problem
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              {!true && <>
                <li><a className="text" data-ripple="" title="Privacy" href="policies">Privacy &amp; Policy</a></li>
                <li><a className="text" data-ripple="" title="Privacy" href="about.html">Contact</a></li>
                <li><a className="text" data-ripple="" title="Privacy" href="faq.html">Faq's</a></li>
                <li><a className="text" data-ripple="" title="Privacy" href="forum.html">Forum</a></li>
              </>}
            </ul>
            {true && <>
              <div className="user-img">
                <h5>{user && user.name}</h5>
                <img src={newPic ? newPic : local && local.pic} alt="" onClick={handleUserSetting} />
                <span className="status f-online"></span>
                <div className={`user-setting ${userSetting.class}`}>
                  <span className="seting-title">
                    Chat setting{" "}
                    <Link to={"/"} title="">
                      see all
                    </Link>
                  </span>
                  <ul className="chat-setting">
                    <li>
                      <Link to={"/"} title="">
                        <span className="status f-online"></span>online
                      </Link>
                    </li>
                    <li>
                      <Link to={"/"} title="">
                        <span className="status f-away"></span>away
                      </Link>
                    </li>
                    <li>
                      <Link to={"/"} title="">
                        <span className="status f-off"></span>offline
                      </Link>
                    </li>
                  </ul>
                  <span className="seting-title">
                    User setting{" "}
                    <Link to={"/setting"} title="" onClick={() => {
                      setUserSetting({ active: false, class: "" })
                    }}>
                      see all
                    </Link>
                  </span>
                  <ul className="log-out">
                    <li>
                      <Link to={`/profile/${user && user._id}`} title="" onClick={() => {
                        setUserSetting({ active: false, class: "" })
                      }}>
                        <i className="ti-user"></i> view profile
                      </Link>
                    </li>
                    <li>
                      <Link to={`/edit`} title="" onClick={() => {
                        setUserSetting({ active: false, class: "" })
                      }}>
                        <i className="ti-pencil-alt"></i>edit profile
                      </Link>
                    </li>
                    <li>
                      <Link to={"/#"} title="" >
                        <i className="ti-target"></i>activity log
                      </Link>
                    </li>
                    <li>
                      <Link to={`/`} title="" onClick={() => {
                        setUserSetting({ active: false, class: "" })
                      }}>
                        <i className="ti-settings"></i>account setting
                      </Link>
                    </li>
                    <li>
                      <Link to={"/logout"} title="">
                        <i className="ti-power-off"></i>log out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {true && <span
                className="ti-settings main-menu"
                data-ripple=""
                onClick={handleSetting}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-settings"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </span>}
            </>}

          </div>
          {/* <!-- nav menu --> */}
        </div>
      </div>

      {/* <!-- topbar --> */}
      <Panel settingClass={setting.class} />
      {/* <!-- right sidebar user chat --> */}
      <SidebarRight handleChat={handleChat} chatBox={chatBox} chatFun={chatFun} />
      {/* <!-- left sidebar menu --> */}
      <SidebarLeft handleLeftSlide={handleLeftSlide} />
    </>
  );
};

export default Header;
