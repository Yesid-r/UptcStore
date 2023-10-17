import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Card,
  Stack,
  ListItemAvatar,
  IconButton
} from '@mui/material';
import { getInitials } from 'src/utils/get-initials';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from '../../pages/auth/editc'
import {API_URL} from '../../utils/constants'
import ImageList from '@mui/material/ImageList';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import InfoIcon from '@mui/icons-material/Info';



export const GaleryList = (props) => {

  const {
    selected = [],
    selec =[]
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
      console.log("e aqui tus datos: ", selec);
  },[])

  const handleDelete = (id) => {
    // Realizar la solicitud HTTP para eliminar un producto por su ID
    fetch(`${API_URL}/galery/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Actualizar la lista de productos después de la eliminación
        //setProducts(products.filter(product => product.id !== id));
        console.log("CORRECTO")
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
    <Card sx={{ width: 600, height: 650, margin: '0 auto' }} >   
     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
    GALERIA </div>
   
    <ImageList sx={{ width: 500, height: 450, margin: '0 auto' }}>
      {selec &&
        selec.map((product) => {
          const isSelected = selected.includes(product._id);
  
          return (
            
            <ListItemAvatar key={product._id}>
              {product ? (
                     <ImageListItem key={product._id}>
                     <img
                       srcSet={`${product.secure_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                       src={`${product.secure_url}?w=248&fit=crop&auto=format`}
                       
                       loading="lazy"
                     />
                     <ImageListItemBar
                       style={{ backdropFilter: 'blur(12px)' }}
                       title={product.public_id.substring(0, 8)}
                       subtitle={"sf"}
                       actionIcon={
                        <IconButton aria-label="delete" color="secondary" onClick={() => handleDelete(product.public_id)} className="delete-button">
                        <DeleteIcon />
                         </IconButton>
                      
                       }
                     />
                   </ImageListItem>
              ) : (
                <Avatar src={product.images}>
                  {getInitials(product.name)}
                </Avatar>
              )}
            
            </ListItemAvatar>

            
          );
        })}
     </ImageList>
    
    {showEdit && <Edit id2={id2} />}
  </Card>
  

    
  );
};

