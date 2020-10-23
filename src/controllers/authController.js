const { json } = require('body-parser');
const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.post('/register', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const userExists = await User.findOne({ email })

        if (userExists)
            return response.status(400).send({error: 'user already exists'});

        const user = {
            name,
            email,
            password
        }

        await User.create(user);
        user.password = undefined;

        return response.json(user);

    } catch (error) {
        console.log(error)
        return response.status(400).send({ error: 'Registration failed' });
    }
})

module.exports = app => app.use('/auth', router);