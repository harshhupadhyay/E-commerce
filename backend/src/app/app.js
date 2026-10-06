import cookieParser from "cookie-parser";
import express from 'express';
import authRoutes from '../routes/auth.routes.js';
import productsRoutes from '../routes/products.route.js';

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)

// app.use(handleMulterError)

export default app
