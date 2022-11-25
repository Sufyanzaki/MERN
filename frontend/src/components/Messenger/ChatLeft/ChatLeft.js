import React, { useEffect, useState } from 'react'
import SimpleBar from 'simplebar-react';
import TimeAgo from 'react-timeago'
import englishString from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { baseURI, getSenderFull } from '../../../utils/helper';
import useLocalStorage from '../../../utils/useLocalStorage';
import axios from 'axios';
import Spinner from '../../Layouts/Loader/Loader';
import { useSelector } from 'react-redux';

const ChatLeft = ({ chatCollection, manageChat, addToChats}) => {

    const { socket } = useSelector(state => state.socket)

    const [local,] = useLocalStorage('user');
    const [search, setSearch] = useState('');
    const [searchRes, setSearchRes] = useState([]);
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({ id: '', class: '' })
    const [notification, setNotification] = useState(null)

    const searchUserFun = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.post(`${baseURI}search`, { name: search }, { withCredentials: true })
            .then(res => { setSearchRes(res.data.user); setLoading(false) }).catch(err => console.log(err))
    }

    const formatter = buildFormatter(englishString)

    const checkActive=(id)=>{
        if(id === notification){
            setNotification(null)
        }
    }

    const sendMessage = (e, id) => {
        e.preventDefault();
        let open;
        axios.post(`${baseURI}messages`, { userId: id }, { withCredentials: true }).then(res => {
            if(Array.isArray(res.data.chat)){
                open = res.data.chat[0]
            }
            else{
                open = res.data.chat
            }
            addToChats(open);
            manageChat(open)
            socket.emit('create-chat',open)
        }).catch(err => console.log(err));
      }

    const style = {
        cross: {
            position: 'absolute',
            right: '13%',
            top: '50%',
            transform: 'translateY(-50%)',
            boxShadow: 'none'
        },
        search: {
            width: '100%',
            zIndex: '1',
            marginTop: '10px'
        }
    }

    useEffect(() => {
		if (!socket) {
			return;
		}
        socket.on('chat-id', (id)=>{
            setNotification(id)
        })
        socket.on('chat-recieved', (data)=>{
            const {users} = data;
            for(let user of users){
                user._id === local._id ? addToChats(data) : console.log('');
            }
        })
	})

    return (
        <div className="message-users">
            <div className="message-head">
                <h4>Chat Messages</h4>
                <div className="more">
                    <div className="more-post-optns"><i><svg viewBox="0 0 512 512"><path d="M504.1 315.1c0-8.652-4.607-16.84-12.36-21.39l-32.91-18.97C459.5 269.1 459.8 262.5 459.8 256s-.3228-13.1-.9683-19.62l32.91-18.97c7.752-4.548 12.36-12.74 12.36-21.39c0-21.27-49.32-128.2-84.52-128.2c-4.244 0-8.51 1.094-12.37 3.357l-32.78 18.97c-10.71-7.742-22.07-14.32-34.07-19.74V32.49c0-11.23-7.484-21.04-18.33-23.88C300.5 2.871 278.3 0 256 0C233.8 0 211.5 2.871 189.9 8.613C179.1 11.45 171.6 21.26 171.6 32.49v37.94c-12 5.42-23.36 12-34.07 19.74l-32.78-18.97C100.9 68.94 96.63 67.85 92.38 67.85c-.0025 0 .0025 0 0 0c-32.46 0-84.52 101.7-84.52 128.2c0 8.652 4.607 16.84 12.36 21.39l32.91 18.97C52.49 242.9 52.17 249.5 52.17 256s.3228 13.1 .9683 19.62L20.23 294.6C12.47 299.1 7.867 307.3 7.867 315.1c0 21.27 49.32 128.2 84.52 128.2c4.244 0 8.51-1.094 12.37-3.357l32.78-18.97c10.71 7.742 22.07 14.32 34.07 19.74v37.94c0 11.23 7.484 21.04 18.33 23.88C211.5 509.1 233.7 512 255.1 512c22.25 0 44.47-2.871 66.08-8.613c10.84-2.84 18.33-12.65 18.33-23.88v-37.94c12-5.42 23.36-12 34.07-19.74l32.78 18.97c3.855 2.264 8.123 3.357 12.37 3.357C452.1 444.2 504.1 342.4 504.1 315.1zM415.2 389.1l-43.66-25.26c-42.06 30.39-32.33 24.73-79.17 45.89v50.24c-13.29 2.341-25.58 3.18-36.44 3.18c-15.42 0-27.95-1.693-36.36-3.176v-50.24c-46.95-21.21-37.18-15.54-79.17-45.89l-43.64 25.25c-15.74-18.69-28.07-40.05-36.41-63.11L103.1 301.7C101.4 276.1 100.1 266.1 100.1 256c0-10.02 1.268-20.08 3.81-45.76L60.37 185.2C68.69 162.1 81.05 140.7 96.77 122l43.66 25.26c42.06-30.39 32.33-24.73 79.17-45.89V51.18c13.29-2.341 25.58-3.18 36.44-3.18c15.42 0 27.95 1.693 36.36 3.176v50.24c46.95 21.21 37.18 15.54 79.17 45.89l43.64-25.25c15.74 18.69 28.07 40.05 36.4 63.11L408 210.3c2.538 25.64 3.81 35.64 3.81 45.68c0 10.02-1.268 20.08-3.81 45.76l43.58 25.12C443.3 349.9 430.9 371.3 415.2 389.1zM256 159.1c-52.88 0-96 43.13-96 96S203.1 351.1 256 351.1s96-43.13 96-96S308.9 159.1 256 159.1zM256 304C229.5 304 208 282.5 208 256S229.5 208 256 208s48 21.53 48 48S282.5 304 256 304z" /></svg></i>
                        <ul>
                            <li><i><svg viewBox="0 0 512 512"><path d="M507.5 117.1c-2.1-12.13-12.37-21.75-24.5-25.13c-12.12-3.25-25.12 .125-33.1 9L390.4 159.6L357.9 154.2l-5.375-32.38l58.75-58.75c8.75-8.875 12.25-21.88 8.875-33.88c-3.375-12.13-13.12-21.5-25.25-24.63c-53.12-13.13-107.1 2.125-146.6 40.75c-37.62 37.63-52.62 91.38-40.75 143.3L23.1 371.1C8.5 387.5 0 408.1 0 429.1s8.5 42.5 23.1 58S60.12 512 81.1 512c21.88 0 42.5-8.5 58-24l183.4-183.3c51.75 11.88 105.6-3.125 143.5-41C504.9 225.7 520.5 169.5 507.5 117.1zM432.9 229.9c-28.5 28.5-70.25 38.13-108.1 25.25l-14.12-4.75l-203.7 203.6c-12.75 12.88-35.25 12.88-47.1 0c-6.499-6.375-9.999-14.88-9.999-24c0-9 3.5-17.63 9.999-24l203.9-203.8l-4.625-14.13C244.4 149.2 253.1 107.5 282.2 79.24c20.37-20.25 47.12-31.25 74.1-31.25h1.125L301.1 105.4l15.12 90.5l90.5 15.13l57.37-57.25C464.5 181.1 453.5 209.2 432.9 229.9zM87.1 407.1c-8.875 0-15.1 7.125-15.1 16c0 8.875 7.125 16 15.1 16s15.1-7.125 15.1-16C103.1 415.1 96.87 407.1 87.1 407.1z" /></svg></i>Setting</li>
                            <li><i><svg viewBox="0 0 512 512"><path d="M493.6 163c-24.88-19.62-45.5-35.37-164.3-121.6C312.7 29.21 279.7 0 256.4 0H255.6C232.3 0 199.3 29.21 182.6 41.38C63.88 127.6 43.25 143.4 18.38 163C6.75 172 0 186 0 200.8v247.2C0 483.3 28.65 512 64 512h384c35.35 0 64-28.67 64-64.01V200.8C512 186 505.3 172 493.6 163zM464 448c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V276.7l136.1 113.4C204.3 406.8 229.8 416 256 416s51.75-9.211 71.97-26.01L464 276.7V448zM464 214.2l-166.8 138.1c-23.19 19.28-59.34 19.27-82.47 .0156L48 214.2l.1055-13.48c23.24-18.33 42.25-32.97 162.9-120.6c3.082-2.254 6.674-5.027 10.63-8.094C229.4 65.99 246.7 52.59 256 48.62c9.312 3.973 26.62 17.37 34.41 23.41c3.959 3.066 7.553 5.84 10.76 8.186C421.6 167.7 440.7 182.4 464 200.8V214.2z" /></svg></i>Active Contacts</li>
                            <li><i><svg viewBox="0 0 576 512"><path d="M572.6 270.3l-96 192C471.2 473.2 460.1 480 447.1 480H64c-35.35 0-64-28.66-64-64V96c0-35.34 28.65-64 64-64h117.5c16.97 0 33.25 6.742 45.26 18.75L275.9 96H416c35.35 0 64 28.66 64 64v32h-48V160c0-8.824-7.178-16-16-16H256L192.8 84.69C189.8 81.66 185.8 80 181.5 80H64C55.18 80 48 87.18 48 96v288l71.16-142.3C124.6 230.8 135.7 224 147.8 224h396.2C567.7 224 583.2 249 572.6 270.3z" /></svg></i>Archives Chats</li>
                            <li><i><svg viewBox="0 0 640 512"><path d="M630.8 469.1l-103.5-81.11c31.35-31.94 57.79-70.78 77.21-114.1c1.906-4.43 3.469-12.07 3.469-17.03c0-4.977-1.562-12.6-3.469-17.03c-54.25-123.4-161.6-206.1-284.5-206.1c-62.67 0-121.2 21.95-170.8 59.62L38.81 5.116C34.41 1.679 29.19 0 24.03 0C16.91 0 9.839 3.158 5.121 9.189c-8.188 10.44-6.37 25.53 4.068 33.7l591.1 463.1c10.5 8.203 25.57 6.333 33.69-4.073C643.1 492.4 641.2 477.3 630.8 469.1zM394.4 283.8l-81.65-63.1C316.1 211.3 319.1 202.2 319.1 192c0-5.48-.8744-10.73-2.183-15.78C318.6 176.2 319.3 176 320 176c44.11 0 80 35.89 80 80.05C400 265.9 397.7 275.1 394.4 283.8zM433.2 314.2C442.4 296.8 448 277.2 448 256.1C448 185.4 390.7 128 320 128C287.8 128 258.7 140.2 236.3 159.9L188.3 122.3C228 95.03 273.1 80 320 80c99.48 0 191.2 67.5 239.6 175.1c-18.06 40.38-42.41 74.43-70.61 101.9L433.2 314.2zM320 384c13.42 0 26.16-2.643 38.31-6.477L302.8 334C279.1 328.8 259.5 312.9 248.8 291.7L192.8 247.8C192.6 250.6 192 253.2 192 256C192 326.7 249.3 384 320 384zM320 432c-99.48 0-191.2-67.5-239.6-175.1c10.83-24.22 24.09-46.03 38.81-65.86L81.28 160.4c-17.77 23.74-33.27 50.04-45.81 78.59C33.56 243.4 31.1 251 31.1 256c0 4.977 1.562 12.6 3.469 17.03c54.25 123.4 161.6 206.1 284.5 206.1c45.46 0 88.77-11.49 128.1-32.14l-42.87-33.59C378 425.4 349.5 432 320 432z" /></svg></i>Unread Chats</li>
                            <li><i><svg viewBox="0 0 512 512"><path d="M476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87c-34.63 0-77.87 8.003-137.2 32.05V24C48 10.75 37.25 0 24 0S0 10.75 0 24v464C0 501.3 10.75 512 24 512s24-10.75 24-24v-104c53.59-23.86 96.02-31.81 132.8-31.81c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0zM464 319.8c-30.31 10.82-58.08 16.1-84.6 16.1c-30.8 0-58.31-7-87.44-14.41c-32.01-8.141-68.29-17.37-111.1-17.37c-42.35 0-85.99 9.09-132.8 27.73V84.14l18.03-7.301c47.39-19.2 86.38-28.54 119.2-28.54c28.24 .0039 49.12 6.711 73.31 14.48c25.38 8.148 54.13 17.39 90.58 17.39c35.43 0 72.24-8.496 114.9-26.61V319.8z" /></svg></i>Report a problem</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="message-people-srch">
                <form method="post" onSubmit={searchUserFun}>
                    <input type="text" placeholder="Search Friend.." value={search} onChange={(e) => { setSearch(e.target.value) }} />
                    {searchRes.length > 0 && <span onClick={()=>{setSearchRes([]); setSearch('')}} type='reset' style={style.cross}><i><svg viewBox="0 0 320 512"><path d="M312.1 375c9.369 9.369 9.369 24.57 0 33.94s-24.57 9.369-33.94 0L160 289.9l-119 119c-9.369 9.369-24.57 9.369-33.94 0s-9.369-24.57 0-33.94L126.1 256L7.027 136.1c-9.369-9.369-9.369-24.57 0-33.94s24.57-9.369 33.94 0L160 222.1l119-119c9.369-9.369 24.57-9.369 33.94 0s9.369 24.57 0 33.94L193.9 256L312.1 375z" /></svg></i></span>}
                    <button type="submit" style={{ boxShadow: 'none' }}><i><svg viewBox="0 0 512 512"><path d="M504.1 471l-134-134C399.1 301.5 415.1 256.8 415.1 208c0-114.9-93.13-208-208-208S-.0002 93.13-.0002 208S93.12 416 207.1 416c48.79 0 93.55-16.91 129-45.04l134 134C475.7 509.7 481.9 512 488 512s12.28-2.344 16.97-7.031C514.3 495.6 514.3 480.4 504.1 471zM48 208c0-88.22 71.78-160 160-160s160 71.78 160 160s-71.78 160-160 160S48 296.2 48 208z" /></svg></i></button>
                    {loading ? <Spinner /> : searchRes.map(s => {
                        return (<div className="searchedUser" key={s._id} style={style.search} onClick={(e)=>{
                            sendMessage(e, s._id)
                        }}>
                            <div className="searchUser">
                                <img src={s.pic} alt='' />
                                <div className="search-user_body">
                                    <strong>{s.name}</strong>
                                    <em>{s.email}</em>
                                </div>
                            </div>
                        </div>)
                    })}
                </form>
                <div className="btn-group add-group" role="group">
                    <button id="btnGroupDrop2" type="button" className="btn group dropdown-toggle user-filter" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        All
                    </button>
                    <div className="dropdown-menu" aria-labelledby="btnGroupDrop2">
                        <a className="dropdown-item" href="https://google.com">Online</a>
                        <a className="dropdown-item" href="https://google.com">Away</a>
                        <a className="dropdown-item" href="https://google.com">unread</a>
                        <a className="dropdown-item" href="https://google.com">archive</a>
                    </div>
                </div>
                <div className="btn-group add-group align-right" role="group">
                    <button id="btnGroupDrop1" type="button" className="btn group dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Create+
                    </button>
                    <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                        <a className="dropdown-item" href="https://google.com">New user</a>
                        <a className="dropdown-item" href="https://google.com">New Group +</a>
                        <a className="dropdown-item" href="https://google.com">Private Chat +</a>
                    </div>
                </div>
            </div>
            <div className="mesg-peple">
                <ul className="nav nav-tabs nav-tabs--vertical msg-pepl-list">
                    <SimpleBar style={{ height: '84vh' }}>
                        {chatCollection.length > 0 && chatCollection.map(chat => {
                            return(
                                    <li className={`nav-item ${notification !== chat._id ? '' : 'unread'}`} key={chat._id} onClick={() => {
                                manageChat(chat);
                                checkActive(chat._id)
                            }}>
                                <a className={state.id === chat._id ? state.class : ''} href="#" onClick={() => { setState({ id: chat._id, class: 'active' }) }}>
                                    <figure><img src={getSenderFull(local, chat.users).pic} alt="" />
                                        <span className="status f-online"></span>
                                    </figure>
                                    <div className="user-name">
                                        <h6 className="">{getSenderFull(local, chat.users).name}</h6>
                                        <span><TimeAgo date={chat.createdAt} formatter={formatter} /></span>
                                    </div>
                                    <div className="more">
                                        <div className="more-post-optns"><i><svg viewBox="0 0 512 512"><path d="M400 256c0 26.5 21.5 48 48 48s48-21.5 48-48S474.5 208 448 208S400 229.5 400 256zM112 256c0-26.5-21.5-48-48-48S16 229.5 16 256S37.5 304 64 304S112 282.5 112 256zM304 256c0-26.5-21.5-48-48-48S208 229.5 208 256S229.5 304 256 304S304 282.5 304 256z" /></svg></i>
                                            <ul>
                                                <li><i><svg viewBox="0 0 640 512"><path d="M183.6 118.6C206.5 82.58 244.1 56.84 288 49.88V32C288 14.33 302.3 .0003 320 .0003C337.7 .0003 352 14.33 352 32V49.88C424.5 61.39 480 124.2 480 200V233.4C480 278.8 495.5 322.9 523.8 358.4L538.7 377C543.1 383.5 545.4 392.2 542.6 400L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L183.6 118.6zM221.7 148.4L450.7 327.1C438.4 298.2 432 266.1 432 233.4V200C432 142.6 385.4 96 328 96H312C273.3 96 239.6 117.1 221.7 148.4V148.4zM160 233.4V222.1L206.7 258.9C202.7 297.7 189.5 335.2 168.3 368H345.2L406.2 416H120C110.8 416 102.4 410.7 98.37 402.4C94.37 394.1 95.5 384.2 101.3 377L116.2 358.4C144.5 322.9 160 278.8 160 233.4V233.4zM384 448C384 464.1 377.3 481.3 365.3 493.3C353.3 505.3 336.1 512 320 512C303 512 286.7 505.3 274.7 493.3C262.7 481.3 256 464.1 256 448H384z" /></svg></i>Mute</li>
                                                <li><i><svg viewBox="0 0 448 512"><path d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z" /></svg></i>Delete</li>
                                                <li><i><svg viewBox="0 0 576 512"><path d="M572.6 270.3l-96 192C471.2 473.2 460.1 480 447.1 480H64c-35.35 0-64-28.66-64-64V96c0-35.34 28.65-64 64-64h117.5c16.97 0 33.25 6.742 45.26 18.75L275.9 96H416c35.35 0 64 28.66 64 64v32h-48V160c0-8.824-7.178-16-16-16H256L192.8 84.69C189.8 81.66 185.8 80 181.5 80H64C55.18 80 48 87.18 48 96v288l71.16-142.3C124.6 230.8 135.7 224 147.8 224h396.2C567.7 224 583.2 249 572.6 270.3z" /></svg></i>Archive</li>
                                                <li><i><svg viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM48 256c0-48.71 16.95-93.47 45.11-128.1l291.9 291.9C349.5 447 304.7 464 256 464C141.3 464 48 370.7 48 256zM418.9 384.1L127 93.11C162.5 64.95 207.3 48 256 48c114.7 0 208 93.31 208 208C464 304.7 447 349.5 418.9 384.1z" /></svg></i>Block</li>
                                                <li><i><svg viewBox="0 0 640 512"><path d="M630.8 469.1l-103.5-81.11c31.35-31.94 57.79-70.78 77.21-114.1c1.906-4.43 3.469-12.07 3.469-17.03c0-4.977-1.562-12.6-3.469-17.03c-54.25-123.4-161.6-206.1-284.5-206.1c-62.67 0-121.2 21.95-170.8 59.62L38.81 5.116C34.41 1.679 29.19 0 24.03 0C16.91 0 9.839 3.158 5.121 9.189c-8.188 10.44-6.37 25.53 4.068 33.7l591.1 463.1c10.5 8.203 25.57 6.333 33.69-4.073C643.1 492.4 641.2 477.3 630.8 469.1zM394.4 283.8l-81.65-63.1C316.1 211.3 319.1 202.2 319.1 192c0-5.48-.8744-10.73-2.183-15.78C318.6 176.2 319.3 176 320 176c44.11 0 80 35.89 80 80.05C400 265.9 397.7 275.1 394.4 283.8zM433.2 314.2C442.4 296.8 448 277.2 448 256.1C448 185.4 390.7 128 320 128C287.8 128 258.7 140.2 236.3 159.9L188.3 122.3C228 95.03 273.1 80 320 80c99.48 0 191.2 67.5 239.6 175.1c-18.06 40.38-42.41 74.43-70.61 101.9L433.2 314.2zM320 384c13.42 0 26.16-2.643 38.31-6.477L302.8 334C279.1 328.8 259.5 312.9 248.8 291.7L192.8 247.8C192.6 250.6 192 253.2 192 256C192 326.7 249.3 384 320 384zM320 432c-99.48 0-191.2-67.5-239.6-175.1c10.83-24.22 24.09-46.03 38.81-65.86L81.28 160.4c-17.77 23.74-33.27 50.04-45.81 78.59C33.56 243.4 31.1 251 31.1 256c0 4.977 1.562 12.6 3.469 17.03c54.25 123.4 161.6 206.1 284.5 206.1c45.46 0 88.77-11.49 128.1-32.14l-42.87-33.59C378 425.4 349.5 432 320 432z" /></svg></i>Ignore Message</li>
                                                <li><i><svg viewBox="0 0 512 512"><path d="M448 64H64C28.65 64 0 92.65 0 128v256c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V128C512 92.65 483.3 64 448 64zM64 112h384c8.822 0 16 7.178 16 16v22.16l-166.8 138.1c-23.19 19.28-59.34 19.27-82.47 .0156L48 150.2V128C48 119.2 55.18 112 64 112zM448 400H64c-8.822 0-16-7.178-16-16V212.7l136.1 113.4C204.3 342.8 229.8 352 256 352s51.75-9.188 71.97-25.98L464 212.7V384C464 392.8 456.8 400 448 400z" /></svg></i>Mark Unread</li>
                                            </ul>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            )
                        })}
                    </SimpleBar>
                </ul>
            </div>
        </div>
    )
}

export default ChatLeft