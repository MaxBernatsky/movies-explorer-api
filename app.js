require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());
mongoose.connect('mongodb://127.0.0.1/bitfilmsdb');
app.use(express.json());
app.use(errors());
app.listen(PORT);
