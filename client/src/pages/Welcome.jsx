import { Box, Button, Typography, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient.js';

/**
 * Página de bienvenida con logo, mensaje y botón para continuar.
 *
 * @returns {JSX.Element}
 */
const Welcome = () => {
  const [info, setInfo] = useState({});
  const [version, setVersion] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get('/info').then(res => setInfo(res.data));
    axiosClient.get('/version').then(res => setVersion(res.data.version));
  }, []);

  const handleContinue = () => {
    navigate('/proveedores');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', width: 400 }}>
        <Typography variant="h6" mb={2}>
          E-Commerce Gapsi
        </Typography>
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
            width: 150,
            height: 150,
            borderRadius: '50%',
            border: '4px solid #2a71b0',
            margin: '0 auto',
            overflow: 'hidden'
        }}
        >
        <Box
            component="img"
            src="/logo.png"
            alt="Logo Gapsi"
            sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
        </Box>
        <Typography variant="subtitle1" mt={2}>
          {info.message || 'Bienvenido Candidato 01'}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleContinue}
        >
          Continuar
        </Button>
        <Typography variant="caption" display="block" mt={4}>
          versión {version || '0.0.1'}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Welcome;
