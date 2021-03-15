var mongoose = require('mongoose');
var attendanceSchema = mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        ref: "Member"
    },
    date: {
        type: String
    }
});

module.exports = mongoose.model("Attendance", attendanceSchema);