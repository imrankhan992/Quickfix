const express= require("express");
const serviceProviderRegistration = require("./Routes/ServiceProvider/Registration/Registration")
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")
app.use(express.json())
app.use(cookieParser())
const allowedOrigins = [
    "http://localhost:5173" 
  ];
  
  app.use(cors({
      origin: function (origin, callback) {
          // Allow requests with no origin (like mobile apps, curl requests)
          if (!origin) return callback(null, true);
  
          if (allowedOrigins.indexOf(origin) === -1) {
              const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
              return callback(new Error(msg), false);
          }
          return callback(null, true);
      },
      credentials: true
  }));
app.use("/api/v1/",serviceProviderRegistration)
module.exports = app;