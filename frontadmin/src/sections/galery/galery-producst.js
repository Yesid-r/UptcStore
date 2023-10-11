import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import React, { useEffect, useState } from 'react';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon
} from '@mui/material';
import { DropzoneArea } from "mui-file-dropzone";

export const GaleryProducts = (props) => {
 
  const { products = [], sx } = props;
   // Inicializar el estado utilizando useState
   const [open, setOpen] = useState(false);
   const [files, setFiles] = useState([]);
 
   // Función para cerrar el modal
   const handleClose = () => {
     setOpen(false);
   }
 
   // Función para guardar los archivos y cerrar el modal
   const handleSave = (newFiles) => {
     setFiles(newFiles);
     setOpen(false);
   }
 
   // Función para abrir el modal
   const handleOpen = () => {
     setOpen(true);
   }
  return (
    <Card sx={sx}>
     
     <DropzoneArea filesLimit={4}  acceptedFiles={['image/*']}
       dropzoneText={"Agrega nuevas imagenes al producto"}
        onChange={(files) => console.log('Files:', files)}
        
      />

      
    </Card>
  );
};

GaleryProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};
