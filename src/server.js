import express from 'express';
import mercadopago from 'mercadopago';
import cors from "cors";
import { categoriesRouter } from './routes/categories.routes.js';
import { productsRouter } from './routes/products.routes.js';
import { usersRouter } from './routes/users.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import { ordersRouter } from './routes/orders.routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert {type: 'json'};

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
  integrator_id: process.env.MP_INTEGRATOR_ID
})

// Hola

// chanfeeeee
const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    // origin: ["https://editor.swagger.io"],
    origin: [process.env.APP_URL, process.env.ADMIN_APP_URL,"http:127.0.0.1:8000","https://editor.swagger.io"],
    // origin: ['process.env.APP_URL', process.env.ADMIN_APP_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["accept", "authorization", "content-type"]
  })
)

app.use(express.json());

app.use(categoriesRouter)
app.use(productsRouter)
app.use(usersRouter)
app.use(cartsRouter)
app.use(ordersRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}. 🏄‍♂️`);
})