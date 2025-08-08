import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_req, res) => res.send('API de Bego funcionando'));

mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
})
    .catch((err) => console.error('Error al conectar a MongoDB:', err));
