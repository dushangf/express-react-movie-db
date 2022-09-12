const express = require('express');
const app = express();
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from './routes/users';
import cors from 'cors';

dotenv.config();

const connection = mongoose.connect(process.env.MONGO_DB_URI || '');

const main = async () => {
  try {
    await connection;
    console.log('successfully connected to mongodb');
  } catch (error) {
    console.log(error.message);
  }
};

main();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));
app.use('/', userRouter);

app.listen(process.env.PORT, () =>
  console.log(`listening on ${process.env.PORT}`)
);
