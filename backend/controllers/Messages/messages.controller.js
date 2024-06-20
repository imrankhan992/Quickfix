const conversationModel = require("../../Models/Message/converstaionModel");
const messageModel = require("../../Models/Message/message.model");


exports.sendMessage = async (req, res) => {
    try {
        const { io, getallSocketIds } = require("../../app");
      const allSocketIds = getallSocketIds();
        const receiverId = req.params.id;
        const senderId = req?.user?._id;
        const { message } = req.body;
        
        let conversation = await conversationModel.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
            conversation = new conversationModel({
                participants: [senderId, receiverId],
            });

        }
        const newMessage = new messageModel({ senderId, receiverId, message });
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = allSocketIds[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json({ newMessage, success: true, });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// get all messages
exports.getMessages = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const conversation = await conversationModel
            .findOne({ participants: { $all: [senderId, receiverId] } })
            .populate("messages");
        if (!conversation) {
            return res
                .status(200)
                .json([]);
        }
        let messages = conversation?.messages;
        res.status(200).json({messages,success:true});
    } catch (error) {
        console.log(`Error in send message controller ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};