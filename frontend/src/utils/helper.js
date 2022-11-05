import axios from "axios";
export const baseURI = 'http://localhost:4000/api/v1/';

// export const config=(val)=>{
//     let config = {headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin' : '*',
//         'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//         'Authorization': 'Bearer ' + val,
//     }
//     }
//     return config
// };

export const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
}

export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
}

export const createChats = async (user, id) => {
    if (user._id === id) {
        console.log('cannot create chat with youself')
        return;
    }
    const { data } = await axios.post(`${baseURI}message`, { userId: id }, { withCredentials: true });
    let chat = data.chat;
    chat = Array.isArray(chat) ? chat[0] : chat;
    return chat;
}
