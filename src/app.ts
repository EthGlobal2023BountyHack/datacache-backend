import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import routes from './router';

dotenv.config();

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
});

const app = express();

app.set('trust proxy', 1);
app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

const swaggerJsDocOptions = {
  definition: {
    openapi: '3.0.0',
    servers: [{ url: '/api/v1' }],
    info: {
      title: 'EthGlobal2023 Wallet Insights API',
      version: '1.0.0',
      description: 'REST API for connecting to backend',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Scott Mitchell',
      },
    },
  },
  apis: ['./src/routes/**/**.ts', './src/models/components.yaml'], // files containing annotations as above
};

const swaggerOptions = {
  explorer: true,
};

const swaggerDocs = swaggerJsDoc(swaggerJsDocOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerOptions));

app.use(limiter);

app.use(routes);

export default app;
