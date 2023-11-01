import express from 'express';
import dotenv from 'dotenv'; 
import productRoutes from './routes/products.js'; 
import { connectDatabase } from './config/dbConnect.js';

const app = express();
dotenv.config({ path: './backend/config/config.env' });

//Import Database Connection
connectDatabase();

app.use(express.json()); //To parse JSON data


//Import all routes
app.use("/api/v1", productRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});