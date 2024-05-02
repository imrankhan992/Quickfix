const express = require("express");
const serviceProviderRegistration = require("./Routes/ServiceProvider/Registration/Registration");
const AdminRoute = require("./Routes/Admin/AdminRoute");
const userroute = require("./Routes/User/userRoute");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = ["http://localhost:5173"];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps, curl requests)
            if (!origin) return callback(null, true);

            if (allowedOrigins.indexOf(origin) === -1) {
                const msg =
                    "The CORS policy for this site does not allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
    })
);
app.use("/api/v1/", serviceProviderRegistration);
app.use("/api/v1/", AdminRoute);
app.use("/api/v1/", userroute);

// export const getReceiverSocketId = (receiverId) => {
//     return userSocketMap[receiverId]
// }

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {

    console.log("a user connected", socket.id);
    socket.on('message', (data) => {
        
        socket.broadcast.emit('message', data);
    });



    const userId = socket.handshake.query.userId;

    if (userId != "undefined") userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));



    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});
// console.log(userSocketMap);
module.exports = { app, server };
