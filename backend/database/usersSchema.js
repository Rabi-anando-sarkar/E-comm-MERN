const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    username : String,
    usermail : String,
    userpass : String
});

module.exports = mongoose.model('users',UsersSchema);