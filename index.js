const express = require("express");
const app = express();
require("./db/dbConnect")

// port
const PORT = require("./config.json").app.port


//body allow
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


//Router
app.use("/", require("./app/app"))

//listining
app.listen(PORT, () => {
    console.log("Create Server " + PORT)
})