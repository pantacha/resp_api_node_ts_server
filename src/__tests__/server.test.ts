import request from "supertest"
import server from "../server"


describe('Call with method, GET to /api', () => {
    test('Should send back (get) a json response', async () => {
        const resp = await request(server).get('/api/products');

        console.log(resp);
        // expect(resp.status).toBe(200);
        // expect(resp.header['content-type']).toMatch(/json/);
        // expect(resp.body.msg).toBe('Desde API');

        // expect(resp.status).not.toBe(400);
        // expect(resp.body.msg).not.toBe('desde API');
    })
})