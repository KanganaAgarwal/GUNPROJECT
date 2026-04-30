const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;

const userSchema = new mongoose.Schema({
    age: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    gender: { type: String, required: true },
    isLegal: { type: Boolean, required: true }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);