require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);

mongoose.connection.on("connected", () => {
    console.log("connected to database");
});
mongoose.connection.on("error", (err) => {
    console.log("error in connection", err);
});

app.get('/', (req, res) => {
    res.send("hello world");
});

const registerroute = require('./routes/register');
const loginRoute = require('./routes/login');

app.use('/register', registerroute);
app.use('/login', loginRoute); 


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
