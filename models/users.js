var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    fb_Id: String,
    token: String,
    username: String,
    email: String
});

module.exports = mongoose.model('User', userSchema);
