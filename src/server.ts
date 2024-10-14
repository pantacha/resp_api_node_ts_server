import express from 'express';
import router from './router';
import db from './config/db';

const server = express(); // Instancia de Express

server.use(express.json()); // Leer datos de formularios

async function connectDB(){ // Conectar a la BD
    try {
        await db.authenticate();
        await db.sync();
        // console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connectDB();

server.use('/api/products', router)

server.get('/api', (req, resp) => {  // ENTORNO TESTING, consultas externas como APIs con superTest
    resp.json({msg: 'Desde API'})
})

export default server