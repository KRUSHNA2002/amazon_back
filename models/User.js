
const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type:String ,require:true},
    password: String,
    phone: String,
},{collection:'loginusers'});

// module.exports=mongoose.model('User',userSchema);

const User = mongoose.model('User', userSchema);

module.exports=User;