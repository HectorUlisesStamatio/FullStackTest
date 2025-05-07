import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import providerRoutes from './routes/providerRoutes.js';
import logger from './middleware/logger.js';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());
app.use(logger);

// Rutas
app.use('/providers', providerRoutes);

// Rutas adicionales
app.get('/info', (req, res) => {
  res.json({ message: 'Bienvenido Candidato 01' });
});

app.get('/version', (req, res) => {
  res.json({ version: '1.0.0' });
});

app.listen(PORT, () => {
  console.log(`Servidor Express ejecutándose en http://localhost:${PORT}`);
});
