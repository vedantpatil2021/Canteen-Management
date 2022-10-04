const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../model/userschema');
const Manager = require('../model/managerschema');
const Category = require('../model/categoryschema');
const router = express.Router();

//------------------------------------USER SIDE--------------------------------------------//
router.post('/userregister', async (req, res)=>{
    const {name, email, phoneno, password, cpassword} = req.body;

    if (!name || !email || !phoneno || !password || !cpassword){
        return res.status("422").json("422");
    }

    if(password === cpassword){
        try{
            const userExist = await User.findOne({email});
            if (userExist){
                return res.status("423").json("423");
            }
            
            const newUser = new User({name, email, phoneno, password})
            await newUser.save();
            return res.status("200").json("200");
        }
        catch(err){
            console.log("Error with",err);
        }
    }
    else{
        return res.status("425").json("425");
    }
})

router.post('/userlogin', async (req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(404).json("404");
        }

        const userLogin = await User.findOne({email});

        if(userLogin){
            const matchpass = await bcrypt.compare(password, userLogin.password);

            if(matchpass){
                let token = await userLogin.generateUserToken();
                res.cookie('userLoginToken',token,{
                    expires:new Date(Date.now() + 3600000),
                    httpOnly: true
                })
                return res.status(200).json("200");
            }
            else{
                return res.status(405).json("405"); 
            }
        }
        else{
            return res.status(406).json("406");
        }
    }catch(err){
        console.log("Error",err);
    }
})

router.post('/userlogout',(req, res)=>{
    res.clearCookie('userLoginToken',{path:'/home'});
    return res.status(200).json("Logged out")
})

//------------------------------------MANAGER SIDE--------------------------------------------//

router.post('/manager_register',async (req, res)=>{
    const {name, email, password, phoneno, cpassword} = req.body;

    if (!name || !email || !phoneno || !password || !cpassword){
        return res.status(404).json("Fill the entire form");
    }

    if(password === cpassword){
        try{
            const managerExist = await Manager.findOne({email});
            if (managerExist){
                return res.status(422).json("The email id is already registered");
            }
            
            const newmanager = new Manager({name, email, phoneno, password})
            await newmanager.save();
            res.status(200).json("Successfully Registered");
        }
        catch(err){
            console.log("Error with",err);
        }
    }
    else{
        return res.status(404).json("Password is not matching");
    }
})

router.post('/managerlogin', async (req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(404).json("404");
        }

        const managerLogin = await Manager.findOne({email});

        if(managerLogin){
            const matchpass = await bcrypt.compare(password, managerLogin.password);

            if(matchpass){
                const token = await managerLogin.generateManagerToken();
                res.cookie('managerLoginToken',token,{
                    expires:new Date(Date.now() + 3600000),
                    httpOnly: true
                })
                return res.status(200).json("200");
            }
            else{
                return res.status(405).json("405"); 
            }
        }
        else{
            return res.status(406).json("406");
        }
    }catch(err){
        console.log("Error",err);
    }
})

router.post('/managerlogout',(req, res)=>{
    res.clearCookie('userLoginToken',{path:'/home'});
    return res.status(200).json("Logged out")
})

//------------------------------------CANTEEN SIDE--------------------------------------------//


router.post('/addcategories',async (req, res)=>{
    const category = req.body
    try{
        const newCategory = new Category(category)
        await newCategory.save();
        return res.status(200).json("200");
    }catch(err){
        return res.status(404).json("404");
    }
})

router.get('/getcategories', async (req,res)=>{
    try{
      const cat = await Category.find();
      res.send(JSON.stringify(cat));
    } catch(err) {
      console.log(err);
    }
});

router.post('/deletecategorie', async (req, res)=>{
    const {category} = req.body
    try{
        const cat = await Category.deleteOne({category:category})
        return res.status(200).json("200")
    }catch(err){
        return res.status(404).json("404");
    }
})

module.exports = router;