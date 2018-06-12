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
        redis.get(key, (err, reply) => {
            if (!err) {
                resolve(reply);
            } else {
                reject(err);
            }
        });
    });
};



const md5 = str => {
    return crypto.createHash("md5").update(str).digest("hex");
};


