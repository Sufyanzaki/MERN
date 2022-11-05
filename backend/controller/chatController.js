import catchAsyncError from "../middleware/catchAsyncErrors.js";
import Chat from "../model/chatModel.js";
import User from "../model/userModel.js";
import ErrorHandler from "../utils/errorhander.js";

export const accessChat = catchAsyncError(async (req, res, next) => {
    const { userId } = req.body;
    if (!userId) {
        return next(new ErrorHandler("User not found", 400));
    }
//check if the chat exist with this user
    let isChat = Chat.find({
        isGroupChat: false,
        $and: [ //loged in user + userId provided
            { users: { $elemMatch: { $eq: req.user._id } } },//find a chat whose users array have current userid
            { users: { $elemMatch: { $eq: userId } } }//and provided userID
        ]
    }).populate("users", "-password").populate("latestMessage")

    isChat = await User.populate(isChat, { path: 'latestMessage.sender', select: 'name email pic' })

    if (isChat.length > 0) {
        res.status(201).json({
            success: true,
            chat: isChat[0],
        })
    }
    else {
        let chatData = { chatname: 'sender', isGroupChat: false, users: [req.user._id, userId] }
        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.find({ _id: createdChat._id }).populate("users", "-password");
            res.status(201).json({
                success: true,
                chat: fullChat,
            })
        } catch (error) {
            return new ErrorHandler('User Id does not exist')
        }
    }
});

export const fetchChats = catchAsyncError(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })//finding chats asssociated with login user
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email",
                });
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

export const createGroupChat = catchAsyncError(async (req, res, next) => {
    if (!req.body.users || !req.body.name) {
        return next(new ErrorHandler("User not found", 400));
    }

    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return next(new ErrorHandler("2 users must be there", 400));
    }
    // users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        console.log(error)
    }
});

export const renameGroup = catchAsyncError(async (req, res) => {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName: chatName,
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(updatedChat);
    }
});

export const addToGroup = catchAsyncError(async (req, res) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(added);
    }
});

export const removeFromGroup = catchAsyncError(async (req, res) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(removed);
    }
});