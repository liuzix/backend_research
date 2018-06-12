"use strict";
const config = require("./config.js");

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const MongoClient = require("mongodb");

const redis = require("redis");
const redisClient = redis.createClient(config.redis.url);

const signup_router = require("./signup.js");
const login_router = require("./login.js");


const app = express();

app.use(bodyParser.json()); 
app.use(cookieParser());

app.get("/api", (req, res) => res.json({}));

app.use("/api/signup", signup_router);

app.use("/api/login", login_router);

redisClient.on("error", err => {
    console.log("Redis Error: " + err);
});

app.locals.cache = redisClient;

MongoClient.connect(config.database.url)
    .catch(err => console.error(err.stack))
    .then(client => {
        app.locals.db = client.db("test");
        app.listen(3000, () => console.log("Listening on port 3000..."));
    });

