const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authmiddle = require('../middleware/Auth')
const { jwtSecret } = require('../config/production.json')

router.get('/', authmiddle, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password') //password ko hta ke sari user ki information bhejna
        res.json(user)
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    //user ko login kr rhe hai 
    //db mai email find krenge milgya toh thik hai agr nhi mila toh invalid credentials  
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'invalid credentials' })
        }
        //agr milgya user toh phir usko valid krvana hai 
        const isMatch = await bcrypt.compare(password, user.password) //plain text (password) or db mai jo user.password hai usko match krega 
        if (!isMatch) {
            res.status(400).json({ msg: "Invalid password" })
        }
        //agr login hojata hai toh token set krenge
        const payload = {
            user: {
                id: user.id     ///TOKEN MAI USER KI ID BHJ RHE HAI 
            }
        }
        jwt.sign(
            payload,
            jwtSecret,
            {
                expiresIn: 360000,
            },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            },
        );
    } catch (error) {
        res.json(error)
    }
})
module.exports = router;