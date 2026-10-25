import cookieParser from "cookie-parser";
import cors from 'cors'
import rateLimit from 'express-rate-limit';
import express from 'express';
import authRoutes from '../routes/auth.routes.js';
import productsRoutes from '../routes/products.route.js';

const app = express()

app.use(cors({
  origin: (origin, callback) => {
    // Allow local development, Vercel deployments, and mobile/API clients
    if (!origin || origin.includes('localhost') || origin.endsWith('.vercel.app') || (process.env.CLIENT_URL && origin === process.env.CLIENT_URL)) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true
}))

// Define Rate Limiter: Max 10 attempts every 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: {
    message: "Too many attempts from this IP, please try again after 15 minutes.",
  },
});

app.use(express.json())
app.use(cookieParser())

// Image Proxy Endpoint — Bypasses CDN hotlink 403 Forbidden by attaching the official Referer header
app.get('/api/proxy-image', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('Image URL is required');
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.zara.com/',
      },
    });

    if (!response.ok) {
      return res.status(response.status).send('Failed to fetch image from source');
    }

    res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours so it's super fast!

    const arrayBuffer = await response.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (error) {
    res.status(500).send('Image proxy error: ' + error.message);
  }
});

// Plug the limiter into login & register:
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)

export default app
