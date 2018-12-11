const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const ROUND_NUMBER = 10;

let UserSchema = new Schema({
    local: {
        username: {
            type: String,
            require: true,
            unique: true,
            max_length: 50
        }, 
        password: {
            require: true,
            type: String
        },
        name: {
            type: String,
        },
        birthday: {
            type: Date
        },
        phone: {
            type: String
        },
        is_active: {
            type: Boolean
        },
        created_at: {
            type: Date
        }, 
        updated_at: {
            type: Date
        }
    }
})

UserSchema.pre('save', function(next) {
    let user = this;

    if (!user.isModified('local.password')) {
        return next();
    }

    bcrypt.genSalt(ROUND_NUMBER, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.local.password, salt, null, function(err, encryptedPassword) {
            if (err) {
                return next(err);
            }
            user.local.password = encryptedPassword;
            next();
        })
    })
})

UserSchema.methods.comparePassword = function (password, cb) {
    let user = this
    bcrypt.compare(password, this.local.password, function (err, isSame) {
        if (err) {
            return cb(err);
        }
        cb(null, isSame);
    });
};

let Users = mongoose.model('User', UserSchema, 'users');

module.exports = Users;