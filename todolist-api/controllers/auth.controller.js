const User = require('../models/User');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/jwt');

async function register(req, res) {
    const { name, email, password} = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User alrady exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name: name, email: email, password: hashedPassword});
        await newUser.save();
        const token = signToken({ id: newUser._id, email: newUser.email });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = signToken({ id: user._id, email: user.email });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { register, login };