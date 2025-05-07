import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import ProviderTable from '../components/ProviderTable';
import ProviderFormDialog from '../components/ProviderFormDialog';
import { fetchProviders, deleteProvider } from '../features/providers/providerSlice';
import Swal from 'sweetalert2';

/**
 * Página General con las funciones básicas del crud.
 *
 * @returns {JSX.Element}
 */

const ProviderList = () => {
  const dispatch = useDispatch();
  const providers = useSelector((state) => state.providers.list);
  const [editProvider, setEditProvider] = useState(null);

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  const handleDelete = async (name) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Esta acción eliminará al proveedor "${name}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (confirm.isConfirmed) {
      await dispatch(deleteProvider(name));
      Swal.fire('Eliminado', 'Proveedor eliminado correctamente.', 'success');
    }
  };

  return (
    <Box
      sx={{
        bgcolor: '#f5f5f5',
        minHeight: '100vh',
        fontFamily: 'Poppins, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        px: 2
      }}
    >
      <Typography variant="h4" gutterBottom fontWeight="bold">Administración de Proveedores</Typography>
      <Box display="flex" justifyContent="space-between" width="100%" maxWidth={900} mb={2}>
        <ProviderFormDialog onSuccess={() => dispatch(fetchProviders())} />
        <Button variant="contained" onClick={() => window.print()}>Imprimir Lista</Button>
      </Box>
      <Box width="100%" maxWidth={900}>
        <ProviderTable providers={providers} onDelete={handleDelete} onEdit={setEditProvider} />
      </Box>
      {editProvider && (
        <ProviderFormDialog
          initialData={editProvider}
          onSuccess={() => {
            setEditProvider(null);
            dispatch(fetchProviders());
          }}
        />
      )}
    </Box>
  );
};

export default ProviderList;
