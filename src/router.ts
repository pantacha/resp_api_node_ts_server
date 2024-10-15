import { Router, Request, Response } from "express";
import { check, param, query, validationResult } from 'express-validator';
import { createProductHandler, deleteProduct, getAllProducts, getProductById, modifyAvailability, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The product name
 *                      example: Monitor Gamer 24FS166Hz
 *                  price:
 *                      type: number
 *                      description: The product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The product availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */

// Routing
router.get('/', getAllProducts as any);

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags: 
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Bad request - Invalid ID
 */
router.get('/:id',
     param('id').isInt().withMessage('ID is not valid'),
     handleInputErrors as any, 
     getProductById as any);

/**
 * @swagger
 * /api/products/:
 *      post:
 *          summary: Create a new product
 *          tags: 
 *              - Products
 *          description: Return a new record in the DB
 *          requestBody:
 *              required: true
 *              content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  name:
 *                                      type: string
 *                                      example: "Monitor Gamer 24FS166Hz"
 *                                  price:
 *                                      type: number
 *                                      example: 300
 *          responses:
 *              201:
 *                  description: Product created Succesfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                                  $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - Invalid field
 */
router.post('/',
    check('name')
                .notEmpty().withMessage('The name of the product should be fulfilled'), // Validacion del campo
    check('price')
                .isNumeric().withMessage('the value not valid') // Validacion del campo (se puede colocar en el Router)
                .notEmpty().withMessage('The price of the product should be fulfilled') // Validacion
                .custom((value) => value>0).withMessage('The price is not valid'), // Validacion
    handleInputErrors as any,
    createProductHandler as any);

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Update a product with user input
 *          tags: 
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  name:
 *                                      type: string
 *                                      example: "Monitor Gamer 24FS166Hz"
 *                                  price:
 *                                      type: number
 *                                      example: 300
 *                                  availability:
 *                                      type: boolean
 *                                      example: true
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                                  $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - Invalid field
 *              404:
 *                  description: Product not found
 */
router.put('/:id',
    param('id').isInt().withMessage('ID is not valid'),
    check('name')
                .notEmpty().withMessage('The name of the product should be fulfilled'), // Validacion del campo
    check('price')
                .isNumeric().withMessage('the value not valid') // Validacion del campo (se puede colocar en el Router)
                .notEmpty().withMessage('The price of the product should be fulfilled') // Validacion
                .custom((value) => value>0).withMessage('The price is not valid'),
    check('availability')
                .isBoolean().withMessage('Value not valid'),
    handleInputErrors as any,
    updateProduct as any);

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update a product availability
 *          tags: 
 *              - Products
 *          description: Returns the updated availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                                  $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - Invalid field
 *              404:
 *                  description: Product not found
 */
router.patch('/:id',
    param('id').isInt().withMessage('ID is not valid'),
    handleInputErrors as any,
    modifyAvailability as any);

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Delete a product by a given ID
 *          tags: 
 *              - Products
 *          description: Returns a confirmation message
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Succesful response
 *              400:
 *                  description: Bad request - Invalid field
 *              404:
 *                  description: Product not found
 */
router.delete('/:id',
    param('id').isInt().withMessage('ID is not valid'),
    handleInputErrors as any,
    deleteProduct as any)

export default router
