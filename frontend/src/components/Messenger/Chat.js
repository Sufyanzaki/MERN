import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseURI } from '../../utils/helper'
import ChatLeft from './ChatLeft/ChatLeft'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatRight from './ChatRight/ChatRight'

const Chat = () => {
    const [chatCollection, setChatCollection] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const notify = (message) => { toast(message); };

    const manageChat = (data)=>{
        if(typeof(data) === "string"){ 
            notify(data);
            return;}
        setSelectedChat(data)
    }
    const addToChats=(data)=>{
        if(typeof(data) === "string"){notify(data);return;}
        setChatCollection([data, ...chatCollection])
    }

    useEffect(() => {
        axios.get(`${baseURI}fetchchats`, { withCredentials: true })
          .then(res => {setChatCollection(res.data)})
          .catch(err => console.log(err));
      }, [])

    return (
        <>
            <section>
                <ToastContainer/>
                <div className="gap2 gray-bg">
                    <div className="container no-padding">
                        <div className="row">
                            <div className="col-lg-12">
                                <ChatLeft addToChats={addToChats} chatCollection={chatCollection} manageChat={manageChat}/>
                                <ChatRight selectedChat={selectedChat}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Chat