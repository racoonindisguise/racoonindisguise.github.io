const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const SECRET_KEY = 'YOUR_RECAPTCHA_SECRET_KEY';

// Dummy storage for demonstration purposes
let users = [];

app.post('/signup', async (req, res) => {
    const { email, password, recaptchaResponse } = req.body;

    // Verify reCAPTCHA
    try {
        const recaptchaVerification = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
            params: {
                secret: SECRET_KEY,
                response: recaptchaResponse
            }
        });

        if (!recaptchaVerification.data.success) {
            return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed.' });
        }

        // Simulate storing user information
        users.push({ email, password });

        res.json({ success: true, message: 'Signup successful!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error: ' + error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
