// app.js

const express = require("express");
const serviceProviderRegistration = require("./Routes/ServiceProvider/Registration/Registration");
const AdminRoute = require("./Routes/Admin/AdminRoute");
const userroute = require("./Routes/User/userRoute");
const orderRouter = require("./Routes/Orders/order.route");
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
app.use("/api/v1/order", orderRouter);

const userSocketMap = {};
io.on("connection", (socket) => {
    console.log("a user connected", socket.id);


    const userId = socket.handshake.query.userId;
    if (userId != "undefined") userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// Export functions and objects
module.exports = { app, server, io, getallSocketIds: () => userSocketMap };
