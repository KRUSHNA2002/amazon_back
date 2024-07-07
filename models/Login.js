const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    phone: Number,
    password: String,
}, { collection: 'loginuser' });

const Login = mongoose.model('login', LoginSchema);

module.exports = Login;
