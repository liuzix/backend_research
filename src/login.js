"use strict";

const express = require("express");
let router = express.Router();

const auth = require("./auth.js");

router.post("/", async (req, res) => {
    const db = req.app.locals.db;
    const data = req.body;
    try {
        const query = await db.collection("user").findOne({
            name: data.name,
            password: data.psw,
        });

        if (query) {
            res.cookie("session", await auth.generateSession(req.app.locals.cache)(data.name));
            res.json({status: "OK"});
        } else {
            res.json({status: "Invalid username and/or password."});
        }
    } catch (err) {
        console.error("Login Error: " + err);
        res.sendStatus(500);
    }
});

router.get("/check", async (req, res) => {
    try {
        const key = req.cookies["session"];
        console.log("current session key: " + key);
        const username = await auth.getUsername(req.app.locals.cache, key);
        if (username) {
            res.json({username: username});
        } else {
            res.json({});
        }
    } catch (err) {
        console.error("Login check error: " + err);
        res.sendStatus(500);
    }
});

module.exports = router;