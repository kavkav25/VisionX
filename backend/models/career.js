// models/career.js

const mongoose = require('mongoose');

// Define the career schema
const careerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    score: { type: Number, default: 0 }
});

// Create a model from the schema
const Career = mongoose.model('Career', careerSchema);

// Sample questions with explicit options
const questions = [
    {
        text: "When given a choice, do you prefer activities that involve being outdoors or working with nature?",
        options: ["Yes", "No"],
        careers: ["Marine Biology", "Forestry and Wildlife", "Agriculture Science", "Eco-tourism"]
    },
    {
        text: "How do you feel about working with animals or studying animal behavior?",
        options: ["Very Interested", "Not Interested"],
        careers: ["Animal Science", "Marine Biology", "Forestry and Wildlife"]
    },
    {
        text: "Do you enjoy expressing yourself through visual arts like painting, sculpting, or photography?",
        options: ["Yes", "No"],
        careers: ["Photography", "Sculptor", "Theatre Artist"]
    },
    {
        text: "Are you passionate about creating or designing clothes, textiles, or fabrics?",
        options: ["Yes", "No"],
        careers: ["Textile Technology", "Culinary Anthropology"]
    },
    {
        text: "How do you feel about managing and organizing events or large gatherings?",
        options: ["Love it", "Not my thing"],
        careers: ["Event Management", "Sports Management"]
    },
    {
        text: "Would you enjoy working in the food industry, either in culinary arts or researching food history?",
        options: ["Yes", "No"],
        careers: ["Culinary Anthropology", "Oenology", "Perfumery and Cosmetic Science"]
    },
    {
        text: "Do you have a deep interest in gemstones, jewelry, and designing unique pieces?",
        options: ["Yes", "No"],
        careers: ["Gemmology"]
    },
    {
        text: "How interested are you in storytelling, whether through games, theatre, or other mediums?",
        options: ["Very Interested", "Not Interested"],
        careers: ["Game Narrative Design", "Theatre Artist"]
    },
    {
        text: "Are you interested in engineering, particularly in unique fields like ceramics or mining?",
        options: ["Yes", "No"],
        careers: ["Ceramic Engineering", "Mining Engineering"]
    },
    {
        text: "Do you enjoy working with data, analyzing patterns, or understanding human behavior?",
        options: ["Yes", "No"],
        careers: ["Counsellor", "Sports Management"]
    },
    {
        text: "How do you feel about exploring and studying marine life and ecosystems?",
        options: ["Very Interested", "Not Interested"],
        careers: ["Marine Biology"]
    },
    {
        text: "Do you enjoy performing on stage, whether it’s acting, singing, or dancing?",
        options: ["Yes", "No"],
        careers: ["Theatre Artist", "Musician"]
    },
    {
        text: "Are you interested in the science of cosmetics, perfumes, and creating beauty products?",
        options: ["Yes", "No"],
        careers: ["Perfumery and Cosmetic Science"]
    },
    {
        text: "Do you have a passion for exploring forests, wildlife, and understanding natural habitats?",
        options: ["Yes", "No"],
        careers: ["Forestry and Wildlife"]
    },
    {
        text: "How interested are you in understanding the history and culture of food across different regions?",
        options: ["Very Interested", "Not Interested"],
        careers: ["Culinary Anthropology", "Oenology"]
    },
    {
        text: "Do you find joy in creating music or playing instruments?",
        options: ["Yes", "No"],
        careers: ["Musician"]
    },
    {
        text: "Are you curious about the relationship between people and their environments, particularly in tourism?",
        options: ["Yes", "No"],
        careers: ["Eco-tourism"]
    },
    {
        text: "Would you enjoy researching and developing new agricultural techniques or sustainable farming methods?",
        options: ["Yes", "No"],
        careers: ["Agriculture Science"]
    },
    {
        text: "Do you have a keen interest in the art of wine making and studying different types of wine?",
        options: ["Yes", "No"],
        careers: ["Oenology"]
    },
    {
        text: "Do you enjoy hands-on work that involves creating sculptures, pottery, or working with ceramics?",
        options: ["Yes", "No"],
        careers: ["Sculptor", "Ceramic Engineering"]
    }
];

// Function to calculate career recommendations based on answers
function calculateCareerRecommendations(answers) {
    const careerCounts = {};

    questions.forEach((question, index) => {
        const careerList = question.careers;

        if (answers[index]) {
            const uniqueCareers = new Set(careerList);

            uniqueCareers.forEach((career) => {
                careerCounts[career] = (careerCounts[career] || 0) + 1;
            });
        }
    });

    const sortedCareers = Object.entries(careerCounts).sort((a, b) => b[1] - a[1]);
    const topCareers = sortedCareers.slice(0, 3).map(entry => entry[0]);

    return topCareers;
}

// Export the model and functions
module.exports = {
    Career,
    questions,
    calculateCareerRecommendations
};

