const mongoose = require('mongoose');
const Users = require('../models/Users');
const config = require('../config/config');

exports.login = (req, res) => {
    if (req.body.username && req.body.password) {
        let username = req.body.username;
        let password = req.body.password;

        Users.findOne({ 'local.username': username })
            .exec((err, user) => {
                console.log(user)
                if (!user) {
                    res.status(401).json({ message: "No such user found" });
                } else {
                    user.comparePassword(req.body.password, function(err, isSame) {
                        if (err) {
                            return res.json({ success: false, msg: err });
                        }
                        
                        if (isSame) {
                            res.json({ message: "ok"});
                        } else {
                            res.status(401).json({ message: "Password is incorrect" });
                        }
                    })
                }
            });
    }
}

exports.regist = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(401).json({message: 'MISSING_REQUIRED_FIELDS'});
    } else {
        Users.findOne({username: req.body.username}, (err, user) => {
            if (err) {
                throw err;
            } else {
                let newUser = new Users({
                    local : {
                        username: req.body.username,
                        password: req.body.password,
                        name: req.body.name,
                        birthday: null,
                        phone: null,
                        is_active: true,
                        created_at: new Date(),
                        updated_at: new Date()
                    }
                });
                console.log(newUser)
                saveToDb(req, res, newUser);
            }
        });
    }
}

function saveToDb(req, res, newUser) {
    newUser.save(function(err) {
        if (err) {
            return res.json({ success: false, msg: err });
        } else {
            return res.json({ success: true, msg: 'SIGNUP_SUCCESS' });
        }
    })
}