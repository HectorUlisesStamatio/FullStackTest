// ProviderTable.jsx
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Paper, TablePagination
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

/**
 * Muestra una tabla con la lista de proveedores y acciones CRUD con paginación.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.providers - Lista de proveedores a mostrar.
 * @param {Function} props.onDelete - Callback al hacer clic en eliminar.
 * @param {Function} props.onEdit - Callback al hacer clic en editar.
 * @returns {JSX.Element} Tabla renderizada.
 */
const ProviderTable = ({ providers, onDelete, onEdit }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedProviders = providers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Razón Social</TableCell>
              <TableCell align="center">Dirección</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProviders.map((prov) => (
              <TableRow key={prov.name}>
                <TableCell align="center">{prov.name}</TableCell>
                <TableCell align="center">{prov.razonSocial}</TableCell>
                <TableCell align="center">{prov.direccion}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(prov)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(prov.name)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={providers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProviderTable;
