const userModel = require("../models/User.model");
const {validationResult} = require("express-validator");
const userService = require("../services/User.services");


module.exports.registerUser = async(req,res,next) => {

    const errors = validationResult(req);
    // console.log(req.body)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fullname, email, password } = req.body;

    const isAlreadyUser = await userModel.findOne({email});

    if(isAlreadyUser){
        return res.status(400).json({ message: 'User Already Exist'});
    }

    const hashedPassword = await userModel.hashPassword(password);
    // console.log(req.body)

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });
    const token = user.getAuthToken();

    res.status(201).json({token, user});
}

module.exports.loginUser = async (req,res,next) => {

    const error = validationResult(req);
    // console.log(req.body)
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        res.status(401).json({message:"Invalid Email or Password"});
    }
    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        res.status(401).json({message:"Invalid Email or Password"});
    }

    const token = await user.getAuthToken();

     res.status(200).json({message:"User Logging SuccessFully",token,user});
}