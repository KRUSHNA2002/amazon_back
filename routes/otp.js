const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Validate mobile number (basic validation example)
const isValidMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/; // Adjust regex as per your requirements
    return mobileRegex.test(mobile);
};

// Middleware to verify Twilio phone number
const verifyTwilioPhoneNumber = async (req, res, next) => {
    try {
        const phoneNumber = await client.lookups.v1.phoneNumbers(process.env.TWILIO_PHONE_NUMBER).fetch({ type: ['carrier'] });
        if (phoneNumber.carrier && phoneNumber.carrier.type === 'mobile') {
            next();
        } else {
            res.status(400).json({ success: false, message: 'Configured Twilio phone number is not SMS-capable.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to verify Twilio phone number', error });
    }
};

router.post('/send', verifyTwilioPhoneNumber, (req, res) => {
    const { mobile } = req.body;

    if (!mobile || !isValidMobile(mobile)) {
        return res.status(400).json({ success: false, message: 'Invalid mobile number' });
    }

    const otp = generateOTP();

    client.messages
        .create({
            body: `Your OTP code is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: mobile
        })
        .then(message => {
            // Store OTP securely for verification purposes (e.g., in a database)
            res.status(200).json({ success: true, message: 'OTP sent successfully', sid: message.sid });
        })
        .catch(error => {
            if (error.code === 21608) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid from phone number. Check if it is SMS-capable and can send messages to the destination region.',
                    error: {
                        status: error.status,
                        code: error.code,
                        moreInfo: error.moreInfo
                    }
                });
            } else {
                res.status(500).json({ success: false, message: 'Failed to send OTP', error });
            }
        });
});

module.exports = router;
