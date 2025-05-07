import { v4 as uuidv4 } from 'uuid';

/**
 * Middleware que genera un UUID por solicitud, lo adjunta al objeto `req`
 * y lo registra en consola para trazabilidad.
 *
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
const logger = (req, res, next) => {
  const transactionId = uuidv4();
  req.transactionId = transactionId;
  console.log(`[${transactionId}] ${req.method} ${req.originalUrl}`);
  res.setHeader('X-Transaction-ID', transactionId);
  next();
};

export default logger;
