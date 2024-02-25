const express= require("express");
const serviceProviderRegistration = require("./Routes/ServiceProvider/Registration/Registration")
const app = express();
app.use("/api/v1/",serviceProviderRegistration)
module.exports = app;