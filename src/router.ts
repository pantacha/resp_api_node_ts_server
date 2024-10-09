import { Router, Request, Response } from "express";
import { check, param, query, validationResult } from 'express-validator';
import { createProductHandler, deleteProduct, getAllProducts, getProductById, modifyAvailability, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

// Routing
router.get('/', getAllProducts as any);

router.get('/:id',
     param('id').isInt().withMessage('ID is not valid'),
     handleInputErrors as any, 
     getProductById as any);

router.post('/', 
    check('name')
                .notEmpty().withMessage('The name of the product should be fulfilled'), // Validacion del campo
    check('price')
                .isNumeric().withMessage('the value not valid') // Validacion del campo (se puede colocar en el Router)
                .notEmpty().withMessage('The price of the product should be fulfilled') // Validacion
                .custom((value) => value>0).withMessage('The price is not valid'), // Validacion
    handleInputErrors as any,
    createProductHandler as any);

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

router.patch('/:id',
    param('id').isInt().withMessage('ID is not valid'),
    handleInputErrors as any,
    modifyAvailability as any);

router.delete('/:id',
    param('id').isInt().withMessage('ID is not valid'),
    handleInputErrors as any,
    deleteProduct as any)

export default router
