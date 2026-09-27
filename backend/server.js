const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Mock user data
const user = {
    email: "",
    password: ""
};

// Login API
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    if (email === user.email && password === user.password) {
        return res.status(200).json({
            success: true,
            message: "Login successful"
        });
    }

    res.status(401).json({
        success: false,
        message: "Invalid email or password"
    });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});