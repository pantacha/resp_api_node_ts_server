import express from 'express';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';

import router from './router';
import db from './config/db';
import swaggerUi, { serve } from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';

const server = express(); // Instancia de Express

const corsOption: CorsOptions = { // Permitir conexiones
    origin: (origin, callback) => {

        if(!origin) return callback(null, true); // Allow requests by no origin (like mobil apps or curl requests)

        const allowedOrigins = [ // List of allowed origins
            process.env.FRONTEND_URL,
        ];

        if(allowedOrigins.includes(origin)){
            callback(null, true); // Allow the request
        }else{
            callback(new Error('Not allowed by CORS')); // Deny the request 
        }
    }
}

server.use(cors(corsOption)); // Enable cors with the defined options

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

server.use(morgan('dev'));

server.use('/api/products', router)

// server.get('/api', (req, resp) => {  // ENTORNO TESTING, consultas externas como APIs con superTest
//     resp.json({msg: 'Desde API'})
// })

// DOCS
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default server