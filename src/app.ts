import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


import userRoutes from './routes/user_routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/users', userRoutes)

app.get('/', (_req, res) => res.send('API de Bego funcionando'));

mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
})
    .catch((e) => console.error('Error al conectar a MongoDB:', e));
