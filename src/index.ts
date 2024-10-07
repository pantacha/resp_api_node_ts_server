import server from "./server";

const PORT = 3456;

server.listen(PORT, () => {
    console.log(`REST API running in the port ${PORT}`);
})