import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: "1.0.0",
            description: "API docs for Products"
        }
    },
    apis: ['./src/router.ts']
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://cdn-icons-png.flaticon.com/512/10169/10169724.png');
            height: 160px;
            width: 160px;
        }
    `,
    customSiteTitle: 'Documentation API Express / TypeScript'
}

export default swaggerSpec;

export {
    swaggerUiOptions
}