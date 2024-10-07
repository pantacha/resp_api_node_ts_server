import express from 'express';
import router from './router';
import db from './config/db';

const server = express();

async function connectDB(){
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connectDB();

server.use('/api/products', router)

export default server