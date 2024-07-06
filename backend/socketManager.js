// socketManager.js

const { Server } = require("socket.io");
const userSocketMap = {};

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: [
                "http://localhost:5173",
                "https://quickfix-281be.web.app",
                "https://noahai.ai",
                "http://localhost:4000",
                "https://quickfix-8pw7.onrender.com"
            ],
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("a user connected", socket.id);

        const userId = socket.handshake.query.userId;
        if (userId !== "undefined") userSocketMap[userId] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        socket.on("disconnect", () => {
            console.log("user disconnected", socket.id);
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    });

    return io;
};

const getallSocketIds = () => userSocketMap;

module.exports = { initializeSocket, getallSocketIds };
