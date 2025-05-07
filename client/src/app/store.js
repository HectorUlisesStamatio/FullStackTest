import { configureStore } from '@reduxjs/toolkit';
import providerReducer from '../features/providers/providerSlice';

/**
 * Configuración de la store de Redux con el slice de proveedores.
 */
const store = configureStore({
  reducer: {
    providers: providerReducer
  }
});

export default store;
