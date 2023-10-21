
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
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Edit from '../../pages/auth/editc'
import {API_URL} from '../../utils/constants'

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import NwProductTable from './nwproducts-table';






export const ProductsTable = (props) => {

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
  const [categories, setCategories] = useState([])

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

      const fetchGalerys = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${API_URL}/categories`)
            const data = await response.json()
            setLoading(false)
            setCategories(data.dataCategory)
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }
    fetchGalerys()
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
    <Box>
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                   
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>categorias</TableCell>
                <TableCell>Opciones</TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
          { products && products.map((product) => {
                const isSelected = selected.includes(product._id);
                

                return (
                  <TableRow
                    hover
                    key={product._id}
                    selected={isSelected}
                  > 
                    {showEdit && 
                    <Card > 
                       <Edit></Edit>
                      </Card>
                    } 
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(product._id);
                          } else {
                            onDeselectOne?.(product._id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{product._id.slice(0, 8)}</TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                          <ListItemAvatar>
                        {
                          product.images ? (
                              <Box
                                component="img"
                                src={product.images.secure_url}
                                sx={{
                                  borderRadius: 1,
                                  height: 48,
                                  width: 48
                                }}
                              ></Box>
                            )
                            : (
                              <Avatar src={product.images}>
                                {getInitials(product.name)}
                              </Avatar>
                            )
                        }
                      </ListItemAvatar>
                        <Typography variant="subtitle2">
                          {product.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    
                    
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.subcategory}</TableCell>
                    <TableCell>
                    <IconButton aria-label="delete" color="secondary" onClick={() => handleDelete(product._id)}>
                    <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="primary" onClick={() => handleEditClick(product._id)}>
                    <ModeEditIcon/>
                    </IconButton>
                   
                    </TableCell>
                  
                  </TableRow>
                  
                );
              })}
        </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      
    </Card>

     
  
    </Box>

    
  );
};

