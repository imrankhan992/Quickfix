const dotenv = require("dotenv").config();
const app = require("./app");
const MongodbConnection = require("./config/database");
MongodbConnection()
app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})
