import catchAsyncError from "../middleware/catchAsyncErrors.js";
import Chat from "../model/chatModel.js";
import User from "../model/userModel.js";
import Message from "../model/messageModel.js";
import ErrorHandler from "../utils/errorhander.js";

export const allMessages = catchAsyncError(async (req, res) => {
    try {
      const messages = await Message.find({ chat: req.body.chatId })
        .populate("sender", "name pic email")
        .populate("chat");
      res.json(messages);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });

  export const sendMessage = catchAsyncError(async (req, res, next) => {
    const { content, chatId } = req.body;  
    if (!content || !chatId) {
      console.log(content, chatId)
        return next(new ErrorHandler("chat not found", 400));
    }
  
    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
  
    try {
      var message = await Message.create(newMessage);
  
      message = await message.populate("sender", "name pic").execPopulate();
      message = await message.populate("chat").execPopulate();
      message = await User.populate(message, {
        path: "chats.users",
        select: "name pic email",
      });
  
      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
  
      res.json(message);
    } catch (error) {
        return next(new ErrorHandler(error, 400));

    }
  });