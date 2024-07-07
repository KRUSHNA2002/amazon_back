
const express=require('express');
const router=express.Router();
const User=require('../models/User');


router.post('/',async (req,res)=>{

    const {name , password , phone}=req.body;

    try{

        // const exitingUser=await User.findOne({ $or: [ {phone}] } );

        // if(exitingUser)
        //     {
        //        return res.status(400).json({message:"user already exists"});
        //     }

        const user=new User({
            name,
            password,
            phone
        });

        await user.save();

        return res.status(200).json({message:'user added succesfully'});
    }
    catch(error){
        
        return res.status(500).json({message:'error resistering user'})
    }
})

module.exports = router;
