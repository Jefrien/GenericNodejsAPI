// Require the framework and instantiate it
import express from 'express'
import cors from 'cors'
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import { connect } from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

// routes import
import accountRouter from './routes/account.js'

/**
 * Express Config
 */
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    allRoutes: true,
    origin: '*',
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
    headers: 'content-type'
}))
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }))

/**
 * Mongoose Config
 */
const options = { useNewUrlParser: true };

// Routes
app.get('/', async (req, res) => {
    return res.json({ api_version: "1.0" })
})

app.get('/status', async (req, res) => {
    return res.json({ api_version: "1.0" })
})

app.use('/api', accountRouter)
/**
 * Validation Token Middleware
 */
// app.use('/api', validateToken, studentRouter)


/**
 * Starts App
 */
const start = async () => {
    try {
        const port = 3000
        app.listen(port, () => console.log(`Server started on port ${port}`));
        await connect(process.env.MONGO_URI, options)
        console.log('Mongo DB Connected')
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();