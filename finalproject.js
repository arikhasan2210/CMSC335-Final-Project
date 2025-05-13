const path = require("path")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const portNumber=4000;
require("dotenv").config({
   path: path.resolve(__dirname, ".env"),
});

app.set("view engine", "ejs");

app.set("views", path.resolve(__dirname, "templates"));

app.get("/", (request, response) => {
    response.render("homePage")
})
app.listen(portNumber);
console.log(`Web Server started and running at http://localhost:${portNumber}`);
