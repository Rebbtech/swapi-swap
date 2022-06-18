import 'dotenv/config';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
dotenv.config();
const app = express();

const PORT = process.env.PORT || 8001;

// MongoDB connection
import mongoClient from './config/db.js';
mongoClient();

app.use(express.json());

// Middlewares
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded());

// Load Routers
import adminRouter from './routers/AdminRouter.js';

// Use Routers
app.use('/api/v1/admin', adminRouter);

app.use('/', (req, res) => {
    res.json({
        message: 'Welcome to Swapi-swap Admin CMS API',
    });
});

app.use((error, req, res) => {
    error.status = error.stale ?? 400;
    res.json({
        status: 'error',
        message: error.message,
    });
});

app.listen(PORT, (error) => {
    error && console.log(error);
    console.log(`Serving at http://localhost:${PORT}`);
});
