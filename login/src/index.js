const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express()
// Convert data into JSON format
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//use EJS as the view engine
app.set('view engine', 'ejs');
//static
app.use(express.static("public"));
app.get("/",(req,res) => {
    res.render("login");

});
app.get("/signup",(req,res) =>{
    res.render("signup");
});

// Register User
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };
    
    // Check if the user already exists in the database
    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
        res.send("User already exists. Please choose a different username.");
    } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword; // Replace the hashed password with the original password

        const userdata = await collection.insertMany(data);
        console.log(userdata);

        // Send success response
        res.json({ success: true });
    }
});

// Login user
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        // Compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            res.json({ success: true });
        } else {
            res.status(400).json({ success: false, message: 'Wrong password' });
        }
    } catch {
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
});




const port = 5000;
app.listen(port, () => {
    console.log('Server running on Port: ${port}');
})