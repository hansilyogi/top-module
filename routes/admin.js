require("dotenv").config();
const express = require('express');
const config = require("../config");
const router = express.Router();
const mongoose = require('mongoose');

const memberSchema = require('../models/member.model');

router.post("/member_register", async function(req, res, next){
    const{ name, mobileNo, emailId, role, password, gender } = req.body;
    try {
        var existMember = await memberSchema.find({ mobileNo: mobileNo });
        if(existMember.length == 1){
            res.status(200).json({ IsSuccess: true, Data: [], Message: "Already Registered !"});
        }else{
            var addMember = await new memberSchema({
                name: name,
                mobileNo: mobileNo,
                emailId: emailId,
                role: role,
                password: password,
                gender: gender
            });
            if(addMember != null){
                addMember.save();
                res.status(200).json({ IsSuccess: true, Data: addMember, Message: "Member Registered !"});
            }
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false, Message: error.message });
    }
});

router.post("/update_member", async function(req, res, next){
    const{ memberId, emailId, password } = req.body;
    try {
        var existMember = await memberSchema.find({ _id: memberId });
        if(existMember.length == 1){
            let updateIs = {
                emailId: emailId,
                password: password
            }
            var updateMember = await memberSchema.findByIdAndUpdate(existMember[0]._id, updateIs);
            res.status(200).json({ IsSuccss: true, Data: 1, Message: "Data Updated"});
        }else{
            res.status(200).json({ IsSuccss: true, Data: 0, Message: "Data Not Updated"});
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false, Message: error.message });
    }
});

router.post('/delete_member', async function(req, res, next){
    const{ memberId } = req.body;
    try {
        var existMember = await memberSchema.findByIdAndDelete(memberId);
        if(existMember){
            res.status(200).json({ IsSuccess: true, Data: 1, Message: "Delete Successfully!" });
        }else{
            res.status(200).json({ IsSuccess: true, Data: 0, Message: "Delete Failed!" });
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false, Message: error.message });
    }
});

module.exports = router;