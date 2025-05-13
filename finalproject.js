const path = require("path")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const portNumber=4000;
require("dotenv").config({
   path: path.resolve(__dirname, ".env"),
});
const { MongoClient, ServerApiVersion} = require("mongodb");
const bcrypt= require("bcrypt");

async function main(){
const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.jlhnsdm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const databaseName= process.env.MONGO_DB_NAME;
const collectionName=process.env.MONGO_COLLECTION;
const client=new MongoClient(uri,{serverApi: ServerApiVersion.v1});

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "templates"));
app.use(bodyParser.urlencoded({extended:false}));

await client.connect();
const database=client.db(databaseName);
const collection=database.collection(collectionName);

app.get("/", (req, res) => {
    res.render("homePage")
});

app.get("/createAccount", (req,res)=>{
    res.render("createAccount");
});

app.post("/createAccount", async (req, res) => {
    const { name, email, password, username, languages } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const dev = {
        name: name,
        email: email,
        username: username,
        password: hashedPassword,
        languages: languages
    };

    await collection.insertOne(dev);
    res.render("successfulCreate");
});
app.post("/", async (req, res) => {
    const { email, password } = req.body;
    const user = await collection.findOne({ email: email });
    if (!user) {
        return res.send("No account with that email exists.");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        res.render("dashboard", { user }); 
    } else {
        res.send("Incorrect password.");
    }
});

app.listen(portNumber);
console.log(`Web Server started and running at http://localhost:${portNumber}`);
}
main();
