import server from "./server";

const PORT = process.env.PORT || 3456;

server.listen(PORT, () => { // Definir el puerto y levantar el server
    console.log(`REST API running in the port ${PORT}`);
})