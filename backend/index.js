import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// 1- this the default that allow everything cors(*)
app.use(cors());
// 2- More custom middlewares we can say more controll
// app.use(
//     cors({
//         origin: 'http://localhost:5000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('welcome to book store')

});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening on ${PORT}`);
        });

    }).catch((err) => {
        console.log(err);
    });