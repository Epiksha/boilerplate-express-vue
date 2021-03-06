const { Schema, model } = require('mongoose');

const UserModel = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    first_name: {
        type: String,
        required: true,
    },
    
    full_name: {
        type: String,
        required: true,
    },

    last_name: {
        type: String,
        required: true,
    },
    
    password: {
        type: String,
        required: true,
    },
}, { collection: 'users'});

module.exports = model('User', UserModel);