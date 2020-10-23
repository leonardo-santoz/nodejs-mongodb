const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.post('/register', async (request, response) => {
    const userFromBody = request.body;
    try {

        const user = await User.create(userFromBody);

        return response.json(user);

    } catch (error) {
        console.log(error)
        return response.status(400).send({error: 'Registration failed'});
    }
})

module.exports = app => app.use('/auth', router);