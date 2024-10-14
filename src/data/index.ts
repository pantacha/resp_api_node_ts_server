import {exit} from 'node:process';
import db from '../config/db';

const clearDB = async () => {
    try {
        await db.sync({force: true});
        console.log('Data deleted');
        await db.close();
        exit(0);
    } catch (error) {
        console.log(error);
        exit(1);
    }
}

if(process.argv[2]==='--clear') clearDB(); // Comprobar si se pasa el argumento --clear para ejecutar la limpieza