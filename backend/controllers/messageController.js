import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    console.log('message received', req.body);
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (message) {
      conversation.messages.push(newMessage._id);
    }

    // run parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO FUNCTIONALITY
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(socket_id).emit() used to send events to specific client
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in messageController@sendMessage", error.message);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate({
      path: "messages",
      //   select: "message",
    });

    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;

    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in messageController@getMessage", error.message);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
