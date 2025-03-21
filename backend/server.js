import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import menuRouter from './routes/menuRouter.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT =  process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
app.use("/menus", menuRouter);

//connect to database
const URI = process.env.MONGODB_URL

mongoose.connect("mongodb+srv://RU-Food:Naitik2411%23@cluster0.d82k6.mongodb.net/RU-Food?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));