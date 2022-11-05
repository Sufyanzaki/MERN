import React from 'react'

const ChatName = (prop) => {
    return (
        <span style={{marginBottom:'0'}}>{prop && prop.name}</span>
  )
}

export default ChatName