import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';

config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Base de datos conectada');
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('Probando server en el puerto 3000 xd');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

// middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno en el servidor';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
