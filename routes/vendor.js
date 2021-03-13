require("dotenv").config();
const express = require('express');
const config = require("../config");
const router = express.Router();
const mongoose = require('mongoose');

const memberSchema = require('../models/member.model');

router.post('/login', async function(req, res, next){
    const{ userId, password, deviceType, fcmToken} = req.body;
    try {
        var existMember = await memberSchema.find({
            mobileNo: userId,
            password: password
        });
        if(existMember.length > 0){
            var updateMember = await memberSchema.findByIdAndUpdate(existMember[0]._id,{
                deviceType: deviceType,
                fcmToken: fcmToken
            });
            res.status(200).json({ IsSuccess: true , Data: existMember , Message: "User LoggedIn" });
        }else{
            res.status(200).json({ IsSuccess: true , Data: [] , Message: "User Not Found" });
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false, Message: error.message });
    }
});

module.exports = router;