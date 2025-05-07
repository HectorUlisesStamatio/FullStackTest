import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProviderList from './pages/ProviderList';
import Welcome from './pages/Welcome';
/**
 * Componente raíz con configuración de rutas.
 *
 * @component
 * @returns {JSX.Element}
 */
const App = () => (
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/proveedores" element={<ProviderList />} />
  </Routes>
);

export default App;
