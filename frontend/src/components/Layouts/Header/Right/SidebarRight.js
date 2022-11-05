import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { baseURI, getSender } from '../../../../utils/helper';
import ChatName from './ChatName';
import useLocalStorage from '../../../../utils/useLocalStorage.js';
import { useSelector } from 'react-redux';

const SidebarRight = ({ handleChat, chatBox, chatFun }) => {

  const {socket} = useSelector(state=>state.socket);
  const {user} = useSelector(state=>state.user);

  const [allUsers, setAllUsers] = useState(null)
  useEffect(() => {
    axios.get(`${baseURI}users`, { withCredentials: true }).then(res => setAllUsers(res.data.users))
      .catch(err => console.log(err))
  }, [])

  const [local,] = useLocalStorage('user');
  const [message, setMessage] = useState(null);
  const [chatCollection, setChatCollection] = useState(null)
  const [msgCollection, setMsgCollection] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeout, settypingTimeout] = useState(null);

  const sendMessage = async (e, id) => {
    e.preventDefault();
    await axios.post(`${baseURI}message`, { userId: id }, { withCredentials: true }).then(res => {
      setMessage('');
      axios.post(`${baseURI}sendmessage`, { content: message, chatId: res.data.chat._id }, { withCredentials: true }).then((res)=>{
        const {data}= res;
        socket.emit('new-message', {data, id:selectedChat._id});
        setMsgCollection([...msgCollection , data])
      })
        .catch(err => console.log(err));
    }).catch(err => console.log(err));
  }

  const handleChange=(e)=>{
    setMessage(e.target.value);
    socket.emit("typing-started", { roomId:selectedChat._id });

    if (typingTimeout) clearTimeout(typingTimeout);

    settypingTimeout(
      setTimeout(() => {
        socket.emit("typing-stopped", { roomId:selectedChat._id });
      }, 1000)
    );
  }

  const [selectedChat, setSelectedChat] = useState(null)

  useEffect(() => {
    axios.get(`${baseURI}fetchchats`, { withCredentials: true })
      .then(res => setChatCollection(res.data))
      .catch(err => console.log(err));
  }, [])

  const fetchMessages = useCallback(async () => {
    if (!selectedChat) return;
    try {
      const { data } = await axios.post(`${baseURI}chats`, { chatId: selectedChat._id },
        { withCredentials: true }
      );
      setMsgCollection(data)
      socket.emit('join-room', selectedChat._id)
    } catch (error) {
      console.log(error)
    }
  });

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  useEffect(() => {
    if (!socket) {
        return;
    }
    if (!user) { return; }
    socket.emit('setup-client', user);
    socket.on('setup-server', () => console.log('connection success'))
}, [socket,user])

  useEffect(() => {
    if (!socket) {
        return;
    }
    socket.on('message-recieved', (newMessageRevieved) => {
        setMsgCollection([...msgCollection , newMessageRevieved])
    })
    socket.on("typing-started-from-server", () => setTyping(true));
    socket.on("typing-stoped-from-server", () => setTyping(false));
})

  return (
    <div className="fixed-sidebar right">
      <div className="chat-friendz">
        {allUsers && allUsers.map((u) => {
          return (<React. Fragment key={u._id}>
            <div className="chat-users" key={u._id}>
              <SimpleBar style={{ minHeight: '78vh' }}>
                <main>
                <div className="author-thmb" title={u.name} onClick={handleChat}>
                  <img src={u.pic} alt="" />
                  <span className="status f-online"></span>
                </div>
                </main>
              </SimpleBar>
              <div className="author-thmb chat" title={u.name} onClick={handleChat}>
                  <i><svg width="20px" viewBox="0 0 640 512"><path d="M208 0C322.9 0 416 78.8 416 176C416 273.2 322.9 352 208 352C189.3 352 171.2 349.7 153.9 345.8C123.3 364.8 79.13 384 24.95 384C14.97 384 5.93 378.1 2.018 368.9C-1.896 359.7-.0074 349.1 6.739 341.9C7.26 341.5 29.38 317.4 45.73 285.9C17.18 255.8 0 217.6 0 176C0 78.8 93.13 0 208 0zM164.6 298.1C179.2 302.3 193.8 304 208 304C296.2 304 368 246.6 368 176C368 105.4 296.2 48 208 48C119.8 48 48 105.4 48 176C48 211.2 65.71 237.2 80.57 252.9L104.1 277.8L88.31 308.1C84.74 314.1 80.73 321.9 76.55 328.5C94.26 323.4 111.7 315.5 128.7 304.1L145.4 294.6L164.6 298.1zM441.6 128.2C552 132.4 640 209.5 640 304C640 345.6 622.8 383.8 594.3 413.9C610.6 445.4 632.7 469.5 633.3 469.9C640 477.1 641.9 487.7 637.1 496.9C634.1 506.1 625 512 615 512C560.9 512 516.7 492.8 486.1 473.8C468.8 477.7 450.7 480 432 480C350 480 279.1 439.8 245.2 381.5C262.5 379.2 279.1 375.3 294.9 369.9C322.9 407.1 373.9 432 432 432C446.2 432 460.8 430.3 475.4 426.1L494.6 422.6L511.3 432.1C528.3 443.5 545.7 451.4 563.5 456.5C559.3 449.9 555.3 442.1 551.7 436.1L535.9 405.8L559.4 380.9C574.3 365.3 592 339.2 592 304C592 237.7 528.7 183.1 447.1 176.6L448 176C448 159.5 445.8 143.5 441.6 128.2H441.6z"/></svg></i>
                </div>
            </div>
            {!selectedChat && <div className={`chat-box ${chatBox.class}`}>
              <div className="chat-head">
                <span className="status f-online"></span>
                <h6>{u.name}</h6>
                <div className="more">
                  <div className="more-optns">
                    <svg viewBox="0 0 512 512"><path d="M256 232C242.7 232 232 242.7 232 256S242.7 280 256 280c13.26 0 24-10.74 24-24S269.3 232 256 232zM256 344c-13.25 0-24 10.74-24 24s10.75 24 24 24c13.26 0 24-10.74 24-24S269.3 344 256 344zM256 120c-13.25 0-24 10.74-24 24S242.7 168 256 168c13.26 0 24-10.74 24-24S269.3 120 256 120zM256 0c-141.4 0-255.1 114.6-255.1 256S114.6 511.1 256 511.1s256-114.6 256-255.1S397.4 0 256 0zM256 480c-123.5 0-224-100.5-224-224s100.5-224 224-224s224 100.5 224 224S379.5 480 256 480z" /></svg>                  <ul>
                      <li>block chat</li>
                      <li>unblock chat</li>
                      <li>conversation</li>
                    </ul>
                  </div>
                  <span className="close-mesage" onClick={() => { chatFun({ active: false, class: "" }) }}>
                    <svg viewBox="0 0 320 512"><path d="M315.3 411.3c-6.253 6.253-16.37 6.253-22.63 0L160 278.6l-132.7 132.7c-6.253 6.253-16.37 6.253-22.63 0c-6.253-6.253-6.253-16.37 0-22.63L137.4 256L4.69 123.3c-6.253-6.253-6.253-16.37 0-22.63c6.253-6.253 16.37-6.253 22.63 0L160 233.4l132.7-132.7c6.253-6.253 16.37-6.253 22.63 0c6.253 6.253 6.253 16.37 0 22.63L182.6 256l132.7 132.7C321.6 394.9 321.6 405.1 315.3 411.3z" /></svg>
                  </span>
                </div>
              </div>
              <div className="chat-list">
                <SimpleBar style={{ minHeight: 300 }}>
                  <ul>
                    {chatCollection && chatCollection.map((c) => {
                      return <li key={c._id}>
                        <div className="searchedUser" onClick={(e) => { setSelectedChat(c) }} style={{ width: '100%', top: '0', position: 'relative' }}>
                          <div className="searchUser">
                            <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="" />
                            <div className="search-user_body">
                              <strong>{c.isGroupChat ? c.chatName : <ChatName name={getSender(local, c.users)} />}</strong>
                              <em>{c.latestMessage && c.latestMessage.content}</em>
                            </div>
                          </div>
                        </div>
                      </li>
                    })}
                  </ul>
                </SimpleBar>
              </div>
            </div>}
            {selectedChat && <div className={`chat-box ${chatBox.class}`}>
              <div className="chat-head">
                <span className="status f-online"></span>
                <h6>{u.name}</h6>
                <div className="more">
                  <div className="more-optns">
                    <svg viewBox="0 0 512 512"><path d="M256 232C242.7 232 232 242.7 232 256S242.7 280 256 280c13.26 0 24-10.74 24-24S269.3 232 256 232zM256 344c-13.25 0-24 10.74-24 24s10.75 24 24 24c13.26 0 24-10.74 24-24S269.3 344 256 344zM256 120c-13.25 0-24 10.74-24 24S242.7 168 256 168c13.26 0 24-10.74 24-24S269.3 120 256 120zM256 0c-141.4 0-255.1 114.6-255.1 256S114.6 511.1 256 511.1s256-114.6 256-255.1S397.4 0 256 0zM256 480c-123.5 0-224-100.5-224-224s100.5-224 224-224s224 100.5 224 224S379.5 480 256 480z" /></svg>                  <ul>
                      <li>block chat</li>
                      <li>unblock chat</li>
                      <li>conversation</li>
                    </ul>
                  </div>
                  <span className="close-mesage" onClick={() => { chatFun({ active: false, class: "" }) }}>
                    <svg viewBox="0 0 320 512"><path d="M315.3 411.3c-6.253 6.253-16.37 6.253-22.63 0L160 278.6l-132.7 132.7c-6.253 6.253-16.37 6.253-22.63 0c-6.253-6.253-6.253-16.37 0-22.63L137.4 256L4.69 123.3c-6.253-6.253-6.253-16.37 0-22.63c6.253-6.253 16.37-6.253 22.63 0L160 233.4l132.7-132.7c6.253-6.253 16.37-6.253 22.63 0c6.253 6.253 6.253 16.37 0 22.63L182.6 256l132.7 132.7C321.6 394.9 321.6 405.1 315.3 411.3z" /></svg>
                  </span>
                </div>
              </div>
              <div className="chat-list">
                <SimpleBar style={{ maxHeight: 300 }}>
                  <ul>
                    {msgCollection.length > 0 && msgCollection.map((m) => {
                      return <li className={local._id === m.sender._id ? 'me':'you'} key={m._id}>
                        <div className="chat-thumb">
                          <img src={m.sender.pic} alt="" />
                        </div>
                        <div className="notification-event">
                          <span className="chat-message-item">
                            {m.content}
                          </span>
                          <span className="notification-date">
                            <time
                              dateTime="2004-07-24T18:18"
                              className="entry-date updated"
                            >
                              Today at 2:12pm
                            </time>
                          </span>
                        </div>
                      </li>
                    })}
                  </ul>
                </SimpleBar>
                <form className="text-box">
                  {typing && <span>Typing...</span>}
                  <textarea value={message} onKeyDown={(e) => (e.code === 'Enter' ? sendMessage(e, u._id) : null)} onChange={handleChange} placeholder="Post enter to post..."></textarea>
                  <button type="submit"></button>
                </form>
              </div>
            </div>}
            </React. Fragment>)
        })}
      </div>
    </div>
  )
}

export default SidebarRight