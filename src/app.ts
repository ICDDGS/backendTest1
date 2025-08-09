import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


import userRoutes from './routes/userRoutes';
import truckRoutes from './routes/truckRoutes';
import locationRoutes from './routes/locationRoutes'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/trucks',truckRoutes);
app.use('/api/locations', locationRoutes)

app.get('/', (_req, res) => res.send('API de Bego funcionando'));

mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
})
    .catch((e) => console.error('Error al conectar a MongoDB:', e));
