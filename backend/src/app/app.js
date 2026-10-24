import cookieParser from "cookie-parser";
import cors from 'cors'
import rateLimit from 'express-rate-limit';
import express from 'express';
import authRoutes from '../routes/auth.routes.js';
import productsRoutes from '../routes/products.route.js';

const app = express()

app.use(cors({
  origin:'http://localhost:5173',
  credentials: true
}))

// 2. Define Rate Limiter: Max 10 attempts every 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  limit: 10,                 // Max 10 requests per window
  message: {
    message: "Too many attempts from this IP, please try again after 15 minutes.",
  },
});


app.use(express.json())
app.use(cookieParser())

// Plug the limiter into login & register:
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)


export default app
