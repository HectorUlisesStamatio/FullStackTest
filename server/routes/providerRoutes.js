/**
 * Rutas para operaciones CRUD de proveedores.
 */

import express from 'express';
import { body } from 'express-validator';
import { getProviders, addProvider ,deleteProvider } from '../controllers/providerController.js';

const router = express.Router();

/**
 * Middleware de validación para creación de proveedores.
 */
const validateProvider = [
  body('name')
    .exists().withMessage('El nombre es requerido')
    .isString().withMessage('El nombre debe ser un string')
    .notEmpty().withMessage('El nombre no puede estar vacío'),
  body('razonSocial')
    .exists().withMessage('La razón social es requerida')
    .isString().withMessage('La razón social debe ser un string')
    .notEmpty().withMessage('La razón social no puede estar vacía'),
  body('direccion')
    .exists().withMessage('La dirección es requerida')
    .isString().withMessage('La dirección debe ser un string')
    .notEmpty().withMessage('La dirección no puede estar vacía')
];

router.get('/', getProviders);
router.post('/', validateProvider, addProvider);
router.delete('/:name', deleteProvider);

export default router;
