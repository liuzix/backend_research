import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.get('/api', (req, res) => res.json({}));

app.post('/api/signup', (req, res) => {
    console.log(req.body);
    res.json({status: "OK"});
});

app.listen(3000, () => console.log('Listening on port 3000...'));