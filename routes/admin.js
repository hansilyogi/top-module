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

var siteImage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/siteImage');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "_" + file.originalname);
    }
});

var areaImage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/areaImage');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "_" + file.originalname);
    }
});

var categoryImage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/categoryImage');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "_" + file.originalname);
    }
});

var taskImage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/taskImage');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "_" + file.originalname);
    }
});

var uploadMember = multer({storage: memberImage});
var uploadSite = multer({storage: siteImage});
var uploadArea = multer({storage: areaImage});
var uploadCategory = multer({storage: categoryImage});
var uploadTask = multer({storage: taskImage});

router.post("/member_register",uploadMember.single('memberImg'), async function(req, res, next){
    const{ name, mobileNo, emailId, role, password, gender } = req.body;
    let fileinfo = req.file;
    try {
        let existMember = await memberSchema.find({ mobileNo: mobileNo });
        if(existMember.length == 1){
            res.status(200).json({ IsSuccess: true, Data: [], Message: "Already Registered !"});
        }else{
            let addMember = await new memberSchema({
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

router.post("/update_member", uploadMember.single('memberImg'), async function(req, res, next){
    const{ memberId, name, mobileNo, emailId, password, gender } = req.body;
    let fileinfo = req.file;
    try {
        let existMember = await memberSchema.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(memberId)
                }
            }
        ]);
        if(existMember.length == 1){
            let updateIs = {
                name: name != undefined ? name : existMember[0].name,
                mobileNo: mobileNo != undefined ? mobileNo : existMember[0].mobileNo,
                emailId: emailId != undefined ? emailId : existMember[0].emailId,
                password: password != undefined ? password : existMember[0].password,
                gender: gender != undefined ? gender : existMember[0].gender,
                memberImg: fileinfo != undefined ? fileinfo.path : existMember[0].memberImg
            }
            let updateMember = await memberSchema.findByIdAndUpdate(memberId, updateIs);
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
        let existMember = await memberSchema.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(memberId)
                }
            }
        ]);
        if(existMember.length == 1){
            let deleteMember = await memberSchema.findByIdAndDelete(memberId);
            res.status(200).json({ IsSuccess: true, Data: 1, Message: "Delete Successfully!" });
        }else{
            res.status(200).json({ IsSuccess: true, Data: 0, Message: "User Not Found" });
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false, Message: error.message });
    }
});

router.post('/getMember', async function(req, res, next){
    const{ memberId } = req.body;
    try {
        let existMember = await memberSchema.find({_id: memberId});
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
            res.status(200).json({ IsSuccess: true, Data: isuser, Message: "Login successfully"});
        }else{
            res.status(200).json({ IsSuccess: true , Data: [] , Message: "User Not Found" });
        }
    } catch (error) {
        res.status(500).json({ IsSuccess : false, Message : error.message });
    }
});

router.post('/project_register', uploadSite.single('siteImg'), async function(req, res, next){
    const{siteName, lat, long, address, customerId, staffId, startDate } = req.body;
    let fileinfo = req.file;
    try {
        let addProject = await new projectSchema({
            siteName: siteName,
            location: {
                lat: lat,
                long: long,
                address: address
            },
            customerId: customerId,
            staffId: staffId,
            startDate: startDate,
            siteImg: fileinfo == undefined ? " " : fileinfo.path,
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
        let existArea = await new areaSchema({
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
        let existCategory = await new categorySchema({
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