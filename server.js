const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const messages = [];

app.get("/", (req, res) => {
    res.json({
        name: "BONA GLOBAL CHAT",
        status: "ONLINE",
        version: "1.0.0"
    });
});

// Get global messages
app.get("/messages", (req, res) => {
    res.json(messages.slice(-100));
});

// Send global message
app.post("/messages", (req, res) => {
    const { username, message } = req.body;

    if (
        typeof username !== "string" ||
        typeof message !== "string" ||
        !username.trim() ||
        !message.trim()
    ) {
        return res.status(400).json({
            error: "Invalid message"
        });
    }

    if (message.length > 500) {
        return res.status(400).json({
            error: "Message too long"
        });
    }

    const newMessage = {
        id: Date.now(),
        username: username.slice(0, 20),
        message: message.trim(),
        timestamp: new Date().toISOString()
    };

    messages.push(newMessage);

    if (messages.length > 500) {
        messages.shift();
    }

    res.json({
        success: true,
        data: newMessage
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("BONA GLOBAL CHAT ONLINE!");
    console.log("Port: " + PORT);
});
