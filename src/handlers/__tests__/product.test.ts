import request from "supertest"
import server from "../../server"

describe('Create a new product via POST to /api/products', () => {

    test('Should display validation errors', async () => {
        const resp = await request(server).post('/api/products').send({});

        expect(resp.status).toBe(400);
        expect(resp.body).toHaveProperty('err');
        expect(resp.body.err).toHaveLength(4);

        expect(resp.status).not.toBe(404);
        expect(resp.body.err).not.toHaveLength(2);
    });

    test('Should validate the price is greater than 0', async () => {
        const resp = await request(server).post('/api/products').send({
            name: "TESTING",
            price: 0,
        });

        expect(resp.status).toBe(400);
        expect(resp.body).toHaveProperty('err');
        expect(resp.body.err).toHaveLength(1);

        expect(resp.status).not.toBe(404);
        expect(resp.body.err).not.toHaveLength(2);
    });

    test('Should validate the price is a number', async () => {
        const resp = await request(server).post('/api/products').send({
            name: "TESTING",
            price: "jkkkkjj",
        });

        expect(resp.status).toBe(400);
        expect(resp.body).toHaveProperty('err');
        expect(resp.body.err).toHaveLength(2);

        expect(resp.status).not.toBe(404);
        expect(resp.body.err).not.toHaveLength(1);
    });
    
    test('Should create a new product', async () => {
        const resp = await request(server).post('/api/products').send({
            name: "Monitor Gamer 24FS166Hz - TESTING",
            price: 200,
        })

        console.log(resp);
        expect(resp.status).toBe(201);
        expect(resp.body).toHaveProperty('product');

        expect(resp.status).not.toBe(400);
        expect(resp.status).not.toBe(200);
        expect(resp.body).not.toHaveProperty('error');
    });
});

describe('Check the  url of products, method GET /api/products', () => {

    test('Should check /api/products', async () => {
        const resp = await request(server).get('/api/products');

        expect(resp.status).not.toBe(404);
    });

    test('Should return a JSON response with products, method GET', async () => {
        const resp = await request(server).get('/api/products');

        expect(resp.status).toBe(200);
        expect(resp.header['content-type']).toMatch(/json/);
        expect(resp.body).toHaveProperty('data');

        expect(resp.body).not.toHaveProperty('error');
    })

});

describe('Check the  url of products, method GET /api/products/:id', () => {
    test('Should return a 404 status response if there are no products with that id', async () => {
        const productId = 2000;
        const resp = await request(server).get(`/api/products/${productId}`);

        expect(resp.status).toBe(404);
        expect(resp.body).not.toHaveProperty('error');
        expect(resp.body.message).toBe('Product not found');
    });

    test('Should check a valid ID in the URL', async () => {
        const resp = await request(server).get(`/api/products/non-valid-url-id`);

        expect(resp.status).toBe(400);
        expect(resp.body).toHaveProperty('err');
        expect(resp.body.err[0].msg).toBe('ID is not valid');
        expect(resp.body.err).toHaveLength(1);
    });

    test('Should return a product with the required ID', async () => {
        const resp = await request(server).get(`/api/products/2`);

        expect(resp.status).toBe(200);
        expect(resp.body).toHaveProperty('data');
    })
});

describe('Check the  url of products, method PUT /api/products/:id', () => {
    test('Should check a valid ID in the URL', async () => {
        const resp = await request(server).put(`/api/products/non-valid-url-id`).send({
            name: "Monitor Gamer 24FS166Hz",
            price: 300,
            availability: true
        });

        expect(resp.status).toBe(400);
        expect(resp.body).toHaveProperty('err');
        expect(resp.body.err[0].msg).toBe('ID is not valid');
        expect(resp.body.err).toHaveLength(1);
    });

    test('Should display validation error messages when updating a product', async () => {
        const resp = await request(server).put(`/api/products/1`).send({});

        expect(resp.status).toBe(400);
        expect(resp.body).toHaveProperty('err');
        expect(resp.body.err).toBeTruthy();
        expect(resp.body.err).toHaveLength(5);

        expect(resp.body).not.toBe(200);
        expect(resp.body).not.toHaveProperty('data');
    });

    test('Should validate the price is greater than 0', async () => {
        const resp = await request(server).put(`/api/products/1`).send({
            name: "Monitor Gamer 24FS166Hz",
            price: 0,
            availability: true
        });

        expect(resp.status).toBe(400);
        expect(resp.body).toHaveProperty('err');
        expect(resp.body.err).toBeTruthy();
        expect(resp.body.err).toHaveLength(1);
        expect(resp.body.err[0].msg).toBe('The price is not valid');

        expect(resp.body).not.toBe(200);
        expect(resp.body).not.toHaveProperty('data');
    });

    test('Should return a 404 if the product is not in the BD', async () => {
        const productId = 2000;
        const resp = await request(server).put(`/api/products/${productId}`).send({
            name: "Monitor Gamer 24FS166Hz",
            price: 3000,
            availability: true
        });

        expect(resp.status).toBe(404);
        expect(resp.body.message).toBe('Product not found');

        expect(resp.body).not.toBe(200);
        expect(resp.body).not.toHaveProperty('data');
    });

    test('Should update a valid product with valid data', async () => {
        const resp = await request(server).put(`/api/products/2`).send({
            name: "Monitor Gamer 24FS166Hz",
            price: 3000,
            availability: true
        });

        expect(resp.status).toBe(200);
        expect(resp.body).toHaveProperty('data');

        expect(resp.body).not.toBe(400);
        expect(resp.body).not.toHaveProperty('err');
    });
});

describe('Check the  url of products, method PATCH /api/products/:id', () => {
    test('Should return a 404 status response if there are no products with that id', async () => {
        const productId = 2000;
        const resp = await request(server).patch(`/api/products/${productId}`);

        expect(resp.status).toBe(404);
        expect(resp.body).not.toHaveProperty('error');
        expect(resp.body.message).toBe('Product not found');
    });
});

describe('Check the  url of products, method DELETE /api/products/:id', () => {
    test('Should check a valid ID in the URL', async () => {
        const resp = await request(server).delete(`/api/products/non-valid-url-id`);

        expect(resp.status).toBe(400);
        expect(resp.body).toHaveProperty('err');
        expect(resp.body.err[0].msg).toBe('ID is not valid');
    });

    test('Should return a 404 if the product is not in the BD', async () => {
        const productId = 2000;
        const resp = await request(server).delete(`/api/products/${productId}`)

        expect(resp.status).toBe(404);
        expect(resp.body.message).toBe('Product not found');

        expect(resp.body).not.toBe(200);
    });

    test('Should delete a valid product with valid data', async () => {
        const resp = await request(server).delete(`/api/products/2`)

        expect(resp.status).toBe(200);
        expect(resp.body.data).toBe('Product deleted');

        expect(resp.status).not.toBe(400);
        expect(resp.status).not.toBe(404);
    });
})