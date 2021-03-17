require("dotenv").config();
const express = require('express');
const config = require("../config");
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const moment = require('moment');

const memberSchema = require('../models/member.model');
const projectSchema = require('../models/projectsite.model');
const areaSchema = require('../models/area.model');
const categorySchema = require('../models/category.model');

var memberImage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/memberImage');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "_" + file.originalname);
    }
});

var uploadMember = multer({
    storage: memberImage,
    limits: {fieldSize: 1024 * 1024 * 5}
});

router.post("/member_register",uploadMember.single('memberImg'), async function(req, res, next){
    const{ name, mobileNo, emailId, role, password, gender } = req.body;
    var fileinfo = req.file;
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
                gender: gender,
                memberImg: fileinfo == undefined ? " " : fileinfo.path
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
    const{ memberId, name, mobileNo, emailId, password, gender } = req.body;
    try {
        var existMember = await memberSchema.find({ _id: memberId });
        if(existMember.length == 1){
            let updateIs = {
                name: name,
                mobileNo: mobileNo,
                emailId: emailId,
                password: password,
                gender: gender
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

router.post('/getMember', async function(req, res, next){
    const{ memberId } = req.body;
    try {
        var existMember = await memberSchema.find({_id: memberId});
        if(existMember.length == 1){
            res.status(200).json({ IsSuccess: true, Data: existMember, Message: "Data found" });
        }else{
            res.status(200).json({ IsSuccess: true, Data: [], Message: "Data not found!" });
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false, Message: error.message });
    }
});

router.post("/login", async function(req,res,next){
    const{ mobileNo, password, deviceType, fcmToken} = req.body;
    try {
        let isuser = await memberSchema.aggregate([
            {
                $match : {
                    $and: [
                        { mobileNo : mobileNo },
                        { password : password }
                    ]
                }
            },
            {
                $project: {
                    password:0
                }
            }
        ]);
        console.log(isuser);
        if(isuser.length == 1){
            let updateMember = await memberSchema.findByIdAndUpdate(isuser[0]._id,{
                deviceType: deviceType,
                fcmToken: fcmToken
            });
            // console.log(updateMember);
        }
    } catch (error) {
        res.status(500).json({ IsSuccess : false, Message : error.message });
    }
});

router.post('/login_old', async function(req, res, next){
    const{ userId, password, deviceType, fcmToken} = req.body;
    try {
        var existMember = await memberSchema.find({
            mobileNo: userId,
            password: password
        });
        console.log(existMember);
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

router.post('/project_register', async function(req, res, next){
    const{siteName, lat, long, address, date} = req.body;
    try {
        var addProject = await new projectSchema({
            siteName: siteName,
            location: {
                lat: lat,
                long: long,
                address: address
            },
            date: date
        });
        if(addProject != null){
            addProject.save();
            res.status(200).json({ IsSuccess: true, Data: addProject, Message: "project site Registered !"});
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false, Message: error.message });
    }
});

// -----------------------------area Master table---------------
router.post('/addArea', async function(req, res, next){
    const{ name } = req.body;
    try {
        var existArea = await new areaSchema({
            name: name
        });
        if(existArea != null){
            existArea.save();
            res.status(200).json({ IsSuccess: true, Data: existArea, Message: "Area Registered !"});
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false, Message: error.message });
    }
});

// -----------------------------category master table-----------------
router.post('/addCategory', async function(req, res, next){
    const{ areaId, categoryName } = req.body;
    try {
        var existCategory = await new categorySchema({
            areaId: areaId,
            categoryName: categoryName
        });
        if(existCategory != null){
            existCategory.save();
            res.status(200).json({ IsSuccess: true, Data: existCategory, Message: "Category Registered !"});
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false, Message: error.message });
    }
})
module.exports = router;