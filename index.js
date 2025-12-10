import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// In-memory user data
const users = {};

// Give a spin
app.post("/add-spin", (req, res) => {
    const { userId } = req.body;
    if (!users[userId]) users[userId] = { spins: 0, points: 0 };
    users[userId].spins += 1;

    res.json({ success: true, spins: users[userId].spins });
});

// Remain spins
app.get("/spins", (req, res) => {
    const userId = req.query.userId;
    if (!users[userId]) users[userId] = { spins: 0, points: 0 };

    res.json({ spins: users[userId].spins });
});

// Save points
app.post("/save-points", (req, res) => {
    const { userId, points } = req.body;
    if (!users[userId]) users[userId] = { spins: 0, points: 0 };

    users[userId].points += points;

    res.json({ success: true, points: users[userId].points });
});

app.get("/", (req, res) => {
    res.send("Spin backend working!");
});

app.listen(3000, () => console.log("Backend running on port 3000"));
