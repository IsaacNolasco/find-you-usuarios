import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'; 
import dotenv from 'dotenv';
import userRoutes from './routes/users';

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

const mongoUri = 'mongodb://localhost:27017/find-user';
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
