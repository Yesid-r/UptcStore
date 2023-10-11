import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  ListItemAvatar,
  IconButton
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Edit from '../../pages/auth/editc'
import {API_URL} from '../../utils/constants'

export const GaleryList = (props) => {

  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(()=>{
      const fetchProducts = async () => {
          try {
              setLoading(true)
              const response = await fetch(`${API_URL}/products`)
              const data = await response.json()
              setLoading(false)
              setProducts(data.products)
          } catch (error) {
              setLoading(false)
              setError(error.message)
          }
      }
      fetchProducts()
  },[])

  const handleDelete = (id) => {
    // Realizar la solicitud HTTP para eliminar un producto por su ID
    fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Actualizar la lista de productos después de la eliminación
        setProducts(products.filter(product => product.id !== id));
      })
      .catch((error) => {
        console.error('Error al eliminar producto:', error);
      });
  };
  const [showEdit, setShowEdit] = useState(false);
  const [id2, setId2] = useState(false);
  const handleEditClick = (id) => {
    setShowEdit(!showEdit); 
    setId2(id);
    console.log(id2)
  };

  return (
    <Card>
    <Stack direction="row" spacing={2} x={{ padding: '10px' }}> {/* Contenedor en dirección "row" */}
      {products &&
        products.map((product) => {
          const isSelected = selected.includes(product._id);
  
          return (
            <ListItemAvatar key={product._id}>
              {product.images ? (
                <Box
                  component="img"
                  src={product.images.secure_url}
                  sx={{
                    borderRadius: 1,
                    height: 148,
                    width: 148,
                  }}
                />
              ) : (
                <Avatar src={product.images}>
                  {getInitials(product.name)}
                </Avatar>
              )}
            </ListItemAvatar>
          );
        })}
    </Stack>
    
    {showEdit && <Edit id2={id2} />}
  </Card>
  

    
  );
};

