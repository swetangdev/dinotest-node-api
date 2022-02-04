require("dotenv").config();
const express = require("express");
// var bcrypt = require("bcryptjs")
var bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
// axios js library to make HTTP request
const axios = require('axios');
const app = express();
const apiConstant = require('./constants/api.constant')
const msgConstant = require('./constants/message.constant')
const authGuard = require("./middleware/authHandler");
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());


/**
 * Login using static username and password
 * On successful login it generate and return Token that allow access to posts
 */

app.post("/login", async (req, res) => {

    try {
        // Getting user input
        const { username, password } = req.body;
        const tokenExpiry = "2h";

        // Validating user input
        if (!(username && password)) {
            res.status(400).send(msgConstant.login.requireCredential);
        } 

        // Check if user exist, here using static username and password to omit dependency of db
        const user = { username: 'admin', password: 'admin123' };
        // const enPass = bcrypt.hash(password, 10);
        //   if (user && (await bcrypt.compare(password, enPass))) {
        if (user && (password == user.password)) {
            // Create JWT token for auth
            const token = jwt.sign(
                { user_id: "1", username },
                process.env.TOKEN_KEY,
                {
                    expiresIn: tokenExpiry,
                }
            );
            
            // create array object for login success response
            resData = {
                code: 200,
                message: msgConstant.login.success
            }
            authData = {
                token: token,
                expiresIn: tokenExpiry
            }

            res.status(200).json({ resData : resData, authData: authData });
        } else {
            res.status(400).send(msgConstant.login.invalidCredential);
        }
    } catch (err) {
        res.status(500).json({ 'error': err});
    }
    
});

/**
 * root route
 */
app.get("/", authGuard, (req, res) => {
    res.json({ message: "Hello from server!" });
});

// posts route to get posts from dinotest wpengine api
app.get("/posts", authGuard, (req, res) => {
  
    axios.get(apiConstant.url.postsURL)
        .then(resp => {
        res.status(200).json({ posts: resp.data });
        })
        .catch ((error) => {
            res.status(500).json({ message: error });
        });
          
});

// posts route with id to get post by id from dinotest wpengine api
app.get("/posts/:id", authGuard, (req, res) => {

    axios.get(apiConstant.url.postsURL+req.params.id)
        .then(resp => {
            // res.status(200).json({ posts: resp.data });
            res.status(200).json({ post : resp.data, statusCode: resp.statusCode, message: 'Success' });
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
  
});

module.exports = app;