const mongoose = require('mongoose');

// Import the Career model
const { Career } = require('./models/career'); // Adjust the path if necessary

// Your MongoDB Atlas connection string
const atlasUri = 'mongodb+srv://pookies4:ilovepanipuri3000@cluster0.c68tf.mongodb.net/careerDB?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(atlasUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Atlas connected');
        // Clear existing career data
        return Career.deleteMany({});
    })
    .then(() => {
        // Insert career data
        return Career.insertMany([
            { name: "Photography", description: "Captures life moments through photography.", score: 0 },
            { name: "Event Management", description: "Plans and coordinates events.", score: 0 },
            { name: "Musician", description: "Creates and performs music.", score: 0 },
            { name: "Textile Technology", description: "Develops and manufactures textiles.", score: 0 },
            { name: "Marine Biology", description: "Studies marine life and ecosystems.", score: 0 },
            { name: "Counsellor", description: "Provides guidance and support to individuals.", score: 0 },
            { name: "Culinary Anthropology", description: "Studies the cultural significance of food.", score: 0 },
            { name: "Ceramic Engineering", description: "Designs and develops ceramic materials.", score: 0 },
            { name: "Oenology", description: "Studies wine production and wine-making techniques.", score: 0 },
            { name: "Theatre Artist", description: "Creates and performs theatrical productions.", score: 0 },
            { name: "Mining Engineering", description: "Develops and operates mining systems.", score: 0 },
            { name: "Eco-tourism", description: "Promotes sustainable tourism practices.", score: 0 },
            { name: "Animal Science", description: "Studies animal behavior and welfare.", score: 0 },
            { name: "Perfumery and Cosmetic Science", description: "Develops fragrances and cosmetics.", score: 0 },
            { name: "Sports Management", description: "Oversees sports teams and events.", score: 0 },
            { name: "Gemmology (Jewellery Designer)", description: "Designs and creates jewelry.", score: 0 },
            { name: "Forestry and Wildlife", description: "Manages and conserves forests and wildlife.", score: 0 },
            { name: "Game Narrative Design", description: "Creates stories and narratives for games.", score: 0 },
            { name: "Agriculture Science", description: "Studies and develops agricultural practices.", score: 0 },
            { name: "Sculptor", description: "Creates three-dimensional artworks.", score: 0 } // Corrected spelling from "Scupltor"
        ]);
    })
    .then(() => {
        console.log('Data seeded successfully!');
        mongoose.connection.close(); // Close the connection
    })
    .catch(err => {
        console.error('Error seeding data:', err);
        mongoose.connection.close(); // Ensure connection is closed on error
    });
