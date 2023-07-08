const router = require('express').Router();
let User = require('../models/user.model');

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

module.exports = router;