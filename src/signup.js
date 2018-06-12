"use strict";

const express = require("express");
let router = express.Router();

router.post("/", async (req, res) => {
    console.log(req.body);
    const json = req.body;
    const db = req.app.locals.db;
    try {
        const user = await db.collection("user").update(
            {name: json.name},
            {$setOnInsert: {password: json.psw}},
            {upsert: true}
        );

        console.log(user.result);
        if (user.result.hasOwnProperty("upserted")) {
            res.json({status: "OK"});
        } else {
            res.json({status: "User name already exists."});
        }
        
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;