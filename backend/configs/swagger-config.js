import swaggerJsdoc from 'swagger-jsdoc';

// CONFIG
import { CURRENT_URL } from './config.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'anasheed api',
      version: '1.0.0',
      description: 'documentation for anasheed API with node.js/mysql',
    },
    servers: [
      {
        url: `${CURRENT_URL}`,
        description: 'development server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerConfig = swaggerJsdoc(swaggerOptions);

export default swaggerConfig;
