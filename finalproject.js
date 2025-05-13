const path = require("path")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
require("dotenv").config({
   path: path.resolve(__dirname, "enver/.env"),
});

app.set("view engine", "ejs")

app.set("views", path.resolve(__dirname, "htmlFiles"))

app.get("/", (request, response) => {
    response.render("Intro")
})
