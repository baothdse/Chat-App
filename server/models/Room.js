const mongoose = require('mongoose');

let RoomSchema = new mongoose.Schema({
    room_name: {
        type : String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model(Room, RoomSchema, "room");