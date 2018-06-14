"use strict";
const crypto = require("crypto");

module.exports.generateSession = (redis) => {
    return async (username) => {
        const key = md5(username + new Date().getTime());
        await redis.set(key, username);
        return key;
    };
};

module.exports.getUsername = (redis, key) => {
    return new Promise((resolve, reject) => {
        if (!key) {
            resolve(null);
            return;
        }
        redis.get(key, (err, reply) => {
            if (!err) {
                resolve(reply);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.processAuth = async (req, _, next) => {
    const key = req.cookies["session"];
    const username = await module.exports.getUsername(req.app.locals.cache, key);
    if (username) {
        console.log("Current username:" + username);
    } else {
        console.log("Currently not logged in");
    }
    req.username = username;
    next();
};



const md5 = str => {
    return crypto.createHash("md5").update(str).digest("hex");
};


