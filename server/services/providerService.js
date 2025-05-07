import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../bd.json');

/**
 * Servicio singleton para manipulación de proveedores.
 * Utiliza un archivo JSON como base de datos simulada.
 */
class ProviderService {
  constructor() {
    const data = fs.readFileSync(DB_PATH);
    this.providers = JSON.parse(data).providers || [];
  }

  save() {
    fs.writeFileSync(DB_PATH, JSON.stringify({ providers: this.providers }, null, 2));
  }

  /**
   * Retorna todos los proveedores.
   * @returns {Array<Object>}
   */
  getAll() {
    return this.providers;
  }

  /**
   * Agrega un nuevo proveedor.
   */
  add(provider) {
    if (this.providers.some(p => p.name === provider.name)) {
      throw new Error('El proveedor ya existe');
    }
    this.providers.push(provider);
    this.save();
    return provider;
  }

  /**
   * Elimina un proveedor por nombre.
   */
  delete(name) {
    this.providers = this.providers.filter(p => p.name !== name);
    this.save();
  }

  /**
   * Actualiza un proveedor dado su nombre original.
   * @param {string} originalName
   * @param {Object} updatedProvider
   */
  update(originalName, updatedProvider) {
    const index = this.providers.findIndex(p => p.name === originalName);
    if (index === -1) {
      throw new Error('Proveedor no encontrado');
    }

    // Si cambia el nombre, verificar duplicado
    if (
      originalName !== updatedProvider.name &&
      this.providers.some(p => p.name === updatedProvider.name)
    ) {
      throw new Error('Ya existe un proveedor con ese nombre');
    }

    this.providers[index] = updatedProvider;
    this.save();
    return updatedProvider;
  }
}

export default new ProviderService();
