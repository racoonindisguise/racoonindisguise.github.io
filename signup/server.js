const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const TURNSTILE_SECRET_KEY = 'YOUR_TURNSTILE_SECRET_KEY';

app.post('/signup', async (req, res) => {
    const { email, password, turnstileResponse } = req.body;

    // Verify Turnstile response
    try {
        const verificationResponse = await axios.post('https://challenges.cloudflare.com/turnstile/v0/siteverify', null, {
            params: {
                secret: TURNSTILE_SECRET_KEY,
                response: turnstileResponse
            }
        });

        if (!verificationResponse.data.success) {
            return res.status(400).json({ success: false, message: 'Turnstile verification failed.' });
        }

        // Simulate storing user information
        // Here you would typically save the user to your database
        res.json({ success: true, message: 'Signup successful!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error: ' + error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
