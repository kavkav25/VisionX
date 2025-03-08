const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://pookies4:ilovepanipuri3000@cluster0.c68tf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");


// Check if the database is connected or not
connect.then(() => {
    console.log("Database connected Successfully");
})
.catch(() => {
    console.log("Database cannot be connected");
});
// Create a schema

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Collection Part
const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;
