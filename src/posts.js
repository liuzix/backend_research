"use strict";

const express = require("express");
let router = express.Router();

const auth = require("./auth.js");

router.post("/", auth.processAuth, async (req, res) => {
    const data = req.body;
    const db = req.app.locals.db;
    const username = req.username;
    if (!username) {
        res.sendStatus(403);
        return;
    }
    try {
        await db.collection("posts").insert({username: username, content: data.content});
    } catch (err) {
        console.error("Posts error: " + err);
        res.sendStatus(500);
    }
});

module.exports = router;