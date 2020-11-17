// JavaScript source code

var express = require('express');
//var app = express();

var router = express.Router();
let jwt = require('jsonwebtoken');
//var cors = require('cors');

//const issue2options = {
//    origin: true,
//    methods: ["POST"],
//    credentials: true,
//    maxAge: 3600
//};
//app.options("/", cors(issue2options));

router.post('/', function (req, res, next) {
    let users = {
        userName: req.body.email,
        password: req.body.password
        //roles: req.body.roles,
    };
    
    let token = jwt.sign(users, global.config.secretKey, {
        algorithm : global.config.algorithm,
        expiresIn:'120m'
    })

    if (users.userName == "admin@gmail.com" && users.password == "admin") {
        //console.log(token);
        res.json(token);
        //res.status(200).json({ message: "Welcome !!" , jwtToken:token });
    }
    else {
        res.json(token = "");
        //res.status(401).json({ message: "Please enter correct username and password." });
    }
});

module.exports = router;