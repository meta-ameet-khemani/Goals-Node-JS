const router = require('express')();
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validations/schema_validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/.env'});

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        let errors = [];
        error.details.forEach(err => errors.push(err.message));
        return res.status(400).json({ success: false, details: errors });
    }

    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).json({ success: false, message: 'Email or Password is wrong' });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({ success: false, message: 'Email or Password is wrong' });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {expiresIn: '10 min'});
    // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);

    // return res.header('auth-token', token).status(200).json({ success: true, token: token});
    return res.status(200).json({ success: true, token: token});
});

router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) {
        let errors = [];
        error.details.forEach(err => errors.push(err.message));
        return res.status(400).json({ success: false, details: errors });
    }
    
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).json({ success: false, message: 'Email already exists' });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email
    });
    
    try {
        await user.save((err, doc) => {
            if (err) {
                res.status(500).json({ success: false, details: error});
                return console.error(err);
            }
            return res.status(200).json({ success: true, data: {userId: doc._id}});
        });
    } catch (error) {
        return res.status(400).json({ success: false, details: error});
    }
});

module.exports = router;