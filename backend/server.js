import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import menuRouter from './routes/menuRouter.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Health check route
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use("/menus", menuRouter);

// Connect to database, then start server
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.log('Failed to connect to MongoDB:', err);
  process.exit(1);
});