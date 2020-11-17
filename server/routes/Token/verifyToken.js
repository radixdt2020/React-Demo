// JavaScript source code

var jwt = require('jsonwebtoken'); 
var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    var token = req.headers['x-access-token'];

    // console.log(token);
    if (token != null && token != undefined) {
        jwt.verify(token, global.config.secretKey,
            {
                algorithm: global.config.algorithm

            }, function (err, decoded) {
                if (err) {
                    let errordata = {
                        message: err.message,
                        expiredAt: err.expiredAt
                    };
                    //console.log(errordata);
                    return res.status(401).json({
                        message: 'Unauthorized Access'
                    });
                }
                req.decoded = decoded;
                // console.log(decoded);
                next();
            });
    } else {
        return res.status(403).json({
            message: 'Forbidden Access'
        });
    }
}); 

module.exports = router;
