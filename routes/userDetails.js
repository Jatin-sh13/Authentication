const express = require('express')
const router = express.Router()
const USERDETAIL = require('../models/userDetail')
const User = require('../models/user')
const authmiddle = require('../middleware/Auth')
router.get('/', authmiddle, async (req, res) => {
    try {
        const data = await USERDETAIL.find({ user: req.user.id })
        res.json(data)
    } catch (error) {
        res.json(error)
    }
})
router.post('/', authmiddle, async (req, res) => {
    try {
        const { username, mobilenumber, email, address } = req.body
        const user = await User.findById(req.user.id).select('-password')
        const userdetails = await new USERDETAIL({
            user: req.user.id,
            username,
            mobilenumber,
            email,
            address,
        })
        const data = await userdetails.save()
        res.json(data)
    } catch (error) {
        console.log(error)
    }
})
router.delete('/:id', authmiddle, async (req, res) => {
    try {
        let userdata = await USERDETAIL.findById(req.params.id);
        if (!userdata) return res.status(404).json({ msg: 'Contact not found' });
        // Make sure user owns contact
        if (userdata.user.toString() !== req.user.id) { //token ko compare krna hai
            console.log(userdata.user)
            return res.status(401).json({ msg: 'Not authorized' });
        }
        await USERDETAIL.findByIdAndRemove(
            req.params.id,
        );
        res.json({ msg: 'Item removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
module.exports = router;