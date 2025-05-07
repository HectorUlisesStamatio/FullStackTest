/**
 * Controlador para las operaciones CRUD de proveedores.
 */

import { validationResult } from 'express-validator';
import providerService from '../services/providerService.js';

/**
 * Controlador para obtener todos los proveedores (sin paginación).
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getProviders = (req, res) => {
  const result = providerService.getAll();
  console.log(`[${req.transactionId}] Respuesta enviada con ${result.length} proveedor(es)`);
  res.json(result);
};

/**
 * Controlador para agregar un nuevo proveedor.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const addProvider = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error(`[${req.transactionId}] Error de validación`, errors.array());
    return res.status(400).json({
      transactionId: req.transactionId,
      error: 'Validación fallida',
      details: errors.array()
    });
  }

  try {
    const provider = req.body;
    const added = providerService.add(provider);
    console.log(`[${req.transactionId}] Proveedor agregado: ${provider.name}`);
    res.status(201).json({ transactionId: req.transactionId, ...added });
  } catch (error) {
    console.error(`[${req.transactionId}] Error al agregar proveedor: ${error.message}`);
    res.status(400).json({ transactionId: req.transactionId, error: error.message });
  }
};

/**
 * Controlador para eliminar un proveedor por nombre.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const deleteProvider = (req, res) => {
  const { name } = req.params;

  try {
    providerService.delete(name);
    console.log(`[${req.transactionId}] Proveedor eliminado: ${name}`);
    res.status(204).send();
  } catch (error) {
    console.error(`[${req.transactionId}] Error al eliminar proveedor: ${error.message}`);
    res.status(400).json({ transactionId: req.transactionId, error: error.message });
  }
};
