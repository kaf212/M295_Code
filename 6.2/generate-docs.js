// generate-docs.js

const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'Library API',
        description: 'API documentation for managing books and lends in a library.',
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
};
const outputFile = './swagger-output.json';
const routes = ['./server.js']; // Update with the actual path to server.js

swaggerAutogen(outputFile, routes, doc).then(() => {
    console.log('Swagger documentation generated successfully');
}).catch(err => {
    console.error('Error generating Swagger documentation:', err);
});
