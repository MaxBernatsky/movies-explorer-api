require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const { middlewaresError } = require('./middlewares/middlewaresError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimit');
const { PORT, DB } = require('./utils/config');

const app = express();
app.use(cors());
mongoose.connect(DB);
app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(middlewaresError);

app.listen(PORT);
