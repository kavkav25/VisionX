const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' folder
app.set('view engine', 'ejs'); // Set EJS as the templating engine

// Sample questions and career paths
const questions = [
    { text: "When given a choice, do you prefer activities that involve being outdoors or working with nature?", careers: ["Marine Biology", "Forestry and Wildlife", "Agriculture Science", "Eco-tourism"] },
    { text: "How do you feel about working with animals or studying animal behavior?", careers: ["Animal Science", "Marine Biology", "Forestry and Wildlife"] },
    { text: "Do you enjoy expressing yourself through visual arts like painting, sculpting, or photography?", careers: ["Photography", "Sculptor", "Theatre Artist"] },
    { text: "Are you passionate about creating or designing clothes, textiles, or fabrics?", careers: ["Textile Technology", "Culinary Anthropology"] },
    { text: "How do you feel about managing and organizing events or large gatherings?", careers: ["Event Management", "Sports Management"] },
    { text: "Would you enjoy working in the food industry, either in culinary arts or researching food history?", careers: ["Culinary Anthropology", "Oenology", "Perfumery and Cosmetic Science"] },
    { text: "Do you have a deep interest in gemstones, jewelry, and designing unique pieces?", careers: ["Gemmology"] },
    { text: "How interested are you in storytelling, whether through games, theatre, or other mediums?", careers: ["Game Narrative Design", "Theatre Artist"] },
    { text: "Are you interested in engineering, particularly in unique fields like ceramics or mining?", careers: ["Ceramic Engineering", "Mining Engineering"] },
    { text: "Do you enjoy working with data, analyzing patterns, or understanding human behavior?", careers: ["Counsellor", "Sports Management"] },
    { text: "How do you feel about exploring and studying marine life and ecosystems?", careers: ["Marine Biology"] },
    { text: "Do you enjoy performing on stage, whether it’s acting, singing, or dancing?", careers: ["Theatre Artist", "Musician"] },
    { text: "Are you interested in the science of cosmetics, perfumes, and creating beauty products?", careers: ["Perfumery and Cosmetic Science"] },
    { text: "Do you have a passion for exploring forests, wildlife, and understanding natural habitats?", careers: ["Forestry and Wildlife"] },
    { text: "How interested are you in understanding the history and culture of food across different regions?", careers: ["Culinary Anthropology", "Oenology"] },
    { text: "Do you find joy in creating music or playing instruments?", careers: ["Musician"] },
    { text: "Are you curious about the relationship between people and their environments, particularly in tourism?", careers: ["Eco-tourism"] },
    { text: "Would you enjoy researching and developing new agricultural techniques or sustainable farming methods?", careers: ["Agriculture Science"] },
    { text: "Do you have a keen interest in the art of wine making and studying different types of wine?", careers: ["Oenology"] },
    { text: "Do you enjoy hands-on work that involves creating sculptures, pottery, or working with ceramics?", careers: ["Sculptor", "Ceramic Engineering"] }
];

// Render the main aptitude test page
app.get('/', (req, res) => {
    res.render('index', { questions });
});

// Handle form submission
app.post('/submit', (req, res) => {
    const answers = req.body.answers;
    const careerCounts = {};

    // Count answers for each career
    questions.forEach((question, index) => {
        if (answers[index]) {
            const selectedOption = answers[index];
            const careerList = question.careers;

            careerList.forEach(career => {
                if (!careerCounts[career]) {
                    careerCounts[career] = 0;
                }
                careerCounts[career]++;
            });
        }
    });

    // Find top careers based on counts
    const sortedCareers = Object.entries(careerCounts).sort((a, b) => b[1] - a[1]);
    const topCareers = sortedCareers.slice(0, 3).map(entry => entry[0]);

    // Render the results page
    res.render('results', { topCareers });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});