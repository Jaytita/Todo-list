const router = require('express').Router();
const User = require('../models/user.model');
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

router.route('/').get((req,res)=>{
    User.find()
        .then(users=>res.json(users))
        .catch(err=> res.status(400).json('Error: '+err));
});

router.route('/register').post((req,res)=>{
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new User({email, username, password,});
    newUser.save()
        .then(()=>res.json('Register successfully!'))
        .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/login').post((req,res)=>{
    const{email,password} = req.body;
    User.findOne({email:email})
        .then(user=>{
            if(password === user.password){
                res.send({message:"Login sucessfully!",user:user})
            }else{
                res.send({message:"Wrong credentials!"})
            }
        })
        .catch(err=> res.status(400).send({message:"Wrong credentials!"}));
});

router.route('/forgotpassword').post(async (req, res) => {
    try {
        // const schema = Joi.object({ email: Joi.string().email().required() });
        // const { error } = schema.validate(req.body);
        // if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/resetpassword/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

router.route('/resetpassword/:id/:token').post(async (req, res) => {
	try {
		// const passwordSchema = Joi.object({
		// 	password: passwordComplexity().required().label("Password"),
		// });
		// const { error } = passwordSchema.validate(req.body);
		// if (error)
		// 	return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		if (!user.verified) user.verified = true;

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user.password = hashPassword;
		await user.save();
		await token.remove();

		res.status(200).send({ message: "Password reset successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;