const express= require("express");
const serviceProviderRegistration = require("./Routes/ServiceProvider/Registration/Registration")
const app = express();
app.use(express.json())
app.use("/api/v1/",serviceProviderRegistration)
module.exports = app;