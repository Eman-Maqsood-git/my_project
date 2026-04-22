const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public')); // Serves frontend

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://db:27017/contactdb';
mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log("DB Error: ", err));

// Simple Schema
const Contact = mongoose.model('Contact', { name: String, email: String });

// API Routes
app.get('/api/contacts', async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});

app.post('/api/contacts', async (req, res) => {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.json({ message: "Contact Saved!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));