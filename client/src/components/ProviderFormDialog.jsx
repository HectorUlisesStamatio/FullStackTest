import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addProvider } from '../features/providers/providerSlice';
import Swal from 'sweetalert2';

/**
 * Componente de formulario en modal para agregar o editar un proveedor.
 *
 * @component
 * @param {Object} props
 * @param {Object|null} [props.initialData=null] - Datos del proveedor a editar (si aplica).
 * @param {Function} props.onSuccess - Callback al guardar exitosamente.
 * @returns {JSX.Element} El modal del formulario.
 */
const ProviderFormDialog = ({ initialData = null, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialData || {
    name: '',
    razonSocial: '',
    direccion: ''
  });

  const dispatch = useDispatch();

  const handleOpen = () => {
    setForm(initialData || {
      name: '',
      razonSocial: '',
      direccion: ''
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const result = await Swal.fire({
      title: '¿Confirmar guardado?',
      text: initialData ? '¿Deseas modificar el proveedor?' : '¿Deseas agregar el proveedor?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) return;

    try {
 
      await dispatch(addProvider(form));
      
      Swal.fire('Éxito', 'Proveedor guardado correctamente.', 'success');
      handleClose();
      onSuccess();
    } catch (err) {
      Swal.fire('Error', 'No se pudo guardar el proveedor.', 'error');
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        {'Agregar'}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'Agregar Proveedor'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Nombre"
            fullWidth
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="razonSocial"
            label="Razón Social"
            fullWidth
            value={form.razonSocial}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="direccion"
            label="Dirección"
            fullWidth
            value={form.direccion}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProviderFormDialog;
