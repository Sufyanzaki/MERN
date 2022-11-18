const TransmissionRoutes = (socket) => {

  socket.on("setup-client", (userData)=>{
    socket.join(userData._id);
    socket.emit("setup-server");
  })

  socket.on("new-message", ({data, id}) => {
    var chat = data.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user == data.sender._id) return;
      socket.broadcast.to(id).emit("message-recieved", data);
    });
  });

  socket.on("new-post", (data) => {
      socket.broadcast.emit("post-recieved", data);
  });

  socket.on('profile-pic', (data)=>{
    socket.broadcast.emit('profile-pic-server', data)
  })

  socket.on("new-comment", (data) => {
    socket.broadcast.emit("comment-recieved", data);
});

socket.on("new-like", (data) => {
  if(data.liked){data.likes-=1}
  else{data.likes+=1}
  console.log(data)
  socket.broadcast.emit("like-recieved", data);
});

  socket.off("setup", ()=>{
    console.log('user disconnected');
    socket.leave(userData._id)
  })

 socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log('User Joined Room : '+ roomId)
  });

  // socket.on("send-message-client", ({ message, roomId }) => {
  //   let skt = socket.broadcast;
  //   skt = roomId ? skt.to(roomId) : skt;
  //   skt.emit("send-message-server", { message });
  // });

  socket.on("typing-started", ({ roomId }) => {
    let skt = socket.broadcast;
    skt = roomId ? skt.to(roomId) : skt;
    skt.emit("typing-started-from-server");
  });

  socket.on("typing-stopped", ({ roomId }) => {
    console.log('typing stopped')
    let skt = socket.broadcast;
    skt = roomId ? skt.to(roomId) : skt;
    skt.emit("typing-stoped-from-server");
  });
};

export default TransmissionRoutes;