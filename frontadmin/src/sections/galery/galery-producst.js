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
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { GaleryList } from './galery-list';
import { useForm } from "react-hook-form";


export const GaleryProducts = (props) => {
 
  const { products = [], sx } = props;
   // Inicializar el estado utilizando useState
   const [open, setOpen] = useState(false);
   const [files, setFiles] = useState([]);
 
   // Función para cerrar el modal
   const handleClose = () => {
     setOpen(false);
   }

   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [responseError, setResponseError] = useState("");
  const [loading, setLoading] = useState(false);

   async function createGallery(dataFiles) {
    const images = [];
    setResponseError("");
    setLoading(true);
    if (dataFiles) {
      for (let index = 0; index < dataFiles.length; index++) {
        const image = new FormData();
        image.append("file", dataFiles[index]);
        image.append("upload_preset", "kindergarden");
        const responseCloud = await fetch(
          "https://api.cloudinary.com/v1_1/ddsuzqzgh/image/upload",
          {
            method: "POST",
            body: image,
          }
        );
        const imageUrl = await responseCloud.json();
        if (imageUrl.error) {
          setLoading(false);
          setResponseError(imageUrl.error.message);
          return;
        }
        images.push(imageUrl.secure_url);
      }
      dataFiles.images = images;
      const response = await fetch("http://localhost:3001/galery/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataFiles),
      });
      const data = await response.json();

      if (data.message === "Gallery created") {
        
      } else {
        setLoading(false);
        setResponseError(data.message);
      }
    }
  }
 

 
   const handleDropzoneChange = (files) => {
    console.log('Files:', files);
    createGallery(files); // Llama a createGallery y pasa los archivos como argumento
  };
   // Función para abrir el modal
   const handleOpen = () => {
     setOpen(true);
   }
  return (
    <Card sx={sx}>
      
      <GaleryList></GaleryList>

     <DropzoneArea filesLimit={4}  acceptedFiles={['image/*']}
       dropzoneText={"Agrega nuevas imagenes al producto"}
       onChange={handleDropzoneChange}
        
      />
      
      <div style={{ float: 'right', padding: '10px' }}>
        <Button
          startIcon={(
            <SvgIcon fontSize="small">
              <FileUploadIcon />
            </SvgIcon>
          )}
          type="submit" 
          variant="outlined"
         
        >
          CONFIRM
        </Button>
      </div>

     
    </Card>
  );
};

GaleryProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};
