import { Request, Response } from "express";
import { check, param, query, validationResult } from 'express-validator';
import Product from "../models/Product.model";
import { handleInputErrors } from "../middleware";

export const getProductById = async (req: Request, resp: Response) => {

    const {id} = req.params;

    //await param('id').isInt().withMessage('ID is not valid').run(req); // La validación colocarla en la defini de la ruta en el Router

    try {
        const product = await Product.findByPk(id);
        if(!product){
            return resp.status(404).json({message: 'Product not found'});
        }
        return resp.status(200).json({data: product});
    } catch (error) {
        return resp.status(500).json({error: 'Internal Server Error', details: error.message})
    }
}

export const getAllProducts = async (req: Request, resp: Response) => {
    try {
        const products = await Product.findAll({
            order: ['id']
        });
        return resp.status(200).json({data: products});
    } catch (error) {
        return resp.status(500).json({error: 'Internal Server Error', details: error.message})
    }
}

export const createProductHandler = async (req: Request, resp: Response) => {

    // await check('name')
    //                 .notEmpty().withMessage('The name of the product should be fulfilled') // Validacion del campo
    //                 .run(req);
    // await check('price')
    //                 .isNumeric().withMessage('the value not valid') // Validacion del campo (se puede colocar en el Router)
    //                 .notEmpty().withMessage('The price of the product should be fulfilled') // Validacion
    //                 .custom((value) => value>0).withMessage('The price is not valid') // Validacion
    //                 .run(req);

    try {
        const product = await Product.create(req.body); // Crear el producto en la BD
        return resp.status(201).json({message: 'Hey!!!', product}); // Enviar la respuesta con el producto creado
    } catch (error) {
        return resp.status(500).json({error: 'Internal Server Error', details: error.message}) // Manejo de errores al crear el product
    }

}

export const updateProduct = async (req: Request, resp: Response) => {

    const {id} = req.params;

    try {
        const product = await Product.findByPk(id);
        if(!product){
            return resp.status(404).json({message: 'Product not found'});
        }

        await product.update(req.body);
        await product.save();

        return resp.status(200).json({data: product});

    } catch (error) {
        return resp.status(500).json({error: 'Internal Server Error', details: error.message})
    }
}

export const modifyAvailability = async (req: Request, resp: Response) => {

    const {id} = req.params;
    const {availability} = req.body;

    try {
        const product = await Product.findByPk(id);
        if(!product){
            return resp.status(404).json({message: 'Product not found'});
        }
        console.log(`Current availability for product ${id}: ${product.availability}`);
        
        if(availability===undefined){
            console.log(`no update performed, availability value is undefined`);
            return resp.status(400).json({message: 'availability value must be provided'});
        }

        product.availability=availability; // Actualizar especificamente el campo "availability"
        await product.save();

        return resp.status(200).json({
            message: 'Product availability uppdated',
            data: product
        });

    } catch (error) {
        return resp.status(500).json({error: 'Internal Server Error', details: error.message})
    }
}

export const deleteProduct = async (req: Request, resp: Response) => {

    const {id} = req.params;

    try {
        const product = await Product.findByPk(id);
        if(!product){
            return resp.status(404).json({message: 'Product not found'});
        }

        await product.destroy();

        return resp.status(200).json({data: 'Product deleted'});

    } catch (error) {
        return resp.status(500).json({error: 'Internal Server Error', details: error.message})
    }
}