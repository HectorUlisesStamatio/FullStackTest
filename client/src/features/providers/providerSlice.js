import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';

/**
 * Acción asincrónica para obtener todos los proveedores.
 */
export const fetchProviders = createAsyncThunk('providers/fetchAll', async () => {
  const response = await axiosClient.get('/providers');
  return response.data;
});

/**
 * Acción asincrónica para agregar un proveedor.
 *
 * @param {Object} provider - Datos del proveedor.
 */
export const addProvider = createAsyncThunk('providers/add', async (provider) => {
  const response = await axiosClient.post('/providers', provider);
  return response.data;
});

/**
 * Acción asincrónica para eliminar un proveedor por nombre.
 *
 * @param {string} name - Nombre del proveedor a eliminar.
 */
export const deleteProvider = createAsyncThunk('providers/delete', async (name) => {
  await axiosClient.delete(`/providers/${name}`);
  return name;
});

/**
 * Slice de Redux para el estado de proveedores.
 */
const providerSlice = createSlice({
  name: 'providers',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProvider.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteProvider.fulfilled, (state, action) => {
        state.list = state.list.filter(p => p.name !== action.payload);
      });
  }
});

export default providerSlice.reducer;
