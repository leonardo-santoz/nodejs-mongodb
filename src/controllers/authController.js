const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');
const User = require('../models/user');

const router = express.Router();

const generateToken = (user_id) => {
    return jwt.sign(
        { id: user_id },
        authConfig.secret,
        { expiresIn: 86400 }
    )
}

router.post('/register', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const userExists = await User.findOne({ email })

        if (userExists)
            return response.status(400).send({ error: 'user already exists' });

        const user = {
            name,
            email,
            password
        }

        await User.create(user);
        user.password = undefined;

        const token = generateToken(user.id);

        return response.json({ user, token });

    } catch (error) {
        return response.status(400).send({ error: 'Registration failed' });
    }
})

router.post('/authenticate', async (request, response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return response.status(400).send({ error: 'User not found' })

    const passwordIsEqual = await bcryptjs.compare(password, user.password);

    if (!passwordIsEqual)
        return response.status(400).send({ error: 'Invalid email/password' });

    user.password = undefined;

    const token = generateToken(user.id);

    return response.json({ user, token });
})

module.exports = app => app.use('/auth', router);