const dotenv = require("dotenv").config();
const {app,server,io} = require("./app");
const MongodbConnection = require("./config/database");
MongodbConnection()
server.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})
