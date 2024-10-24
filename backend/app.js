// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const { Career, questions, calculateCareerRecommendations } = require('./models/career');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Atlas connection string
const atlasUri = 'mongodb+srv://pookies4:ilovepanipuri3000@cluster0.c68tf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(atlasUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Atlas connected'))
    .catch(err => console.error('MongoDB Atlas connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route: Render the aptitude test form
app.get('/', (req, res) => {
    if (!questions || questions.length === 0) {
        return res.status(500).send('No questions available.');
    }
    res.render('index', { questions });
});

// Route: Handle form submission
app.post('/submit', (req, res) => {
    const answers = req.body.answers; // Assume answers are sent as key-value pairs

    if (!answers || Object.keys(answers).length === 0) {
        return res.status(400).send('No answers provided.');
    }

    // Calculate career recommendations based on answers
    const topCareers = calculateCareerRecommendations(answers);

    // Fetch matching careers from the database
    Career.find({ name: { $in: topCareers } })
        .then(careers => {
            res.render('results', { topCareers: careers });
        })
        .catch(err => {
            console.error('Error fetching careers:', err);
            res.status(500).send('Internal Server Error');
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
