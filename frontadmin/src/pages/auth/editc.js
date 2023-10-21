import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Head from 'next/head';
import dotenv from 'dotenv'
import {API_URL} from '../../utils/constants'
import {
  Avatar,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  ListItemAvatar,
  IconButton
} from '@mui/material';
const Edit = ({id2}) => {
  
  console.log("edti: "+ id2)
  const [filea, setFilea] = React.useState('');
  const handleFileChange = (event) => {
    setFilea(event.target.files[0]);
    if (filea) {
      
      console.log("Archivo seleccionado:", filea.name);
     
    }
  };
  
  const router = useRouter();
  const auth = useAuth();
  const [estado, setEstado] = React.useState('');
  const [categoria, setCategoria] = React.useState('');

  const handleChange = (event) => {
 
    setEstado(event.target.value);
    formik.setFieldValue('availability', event.target.value);
    console.log("hola . " + event.target.value)
  };
  

  const handleChange2 = (event) => {
    setCategoria(event.target.value);
    formik.setFieldValue('category', event.target.value);
    console.log("hola . " + event.target.value)
  };
  
  const categorias = [
    { id: "651a01d23f0e950ef7991a19", nombre: "Libreria" },
    { id: "651a022c3f0e950ef7991a1b", nombre: "Papeleria" },
    { id: "651a02783f0e950ef7991a1d", nombre: "Ropa" },
    { id: "651a02cf3f0e950ef7991a20", nombre: "Accesorios" }
    // Agrega más categorías aquí
  ];
  
  const subcategorias = [
    { id: "subcategoria1", nombre: "Ingenieria", categoriaId: "651a01d23f0e950ef7991a19" },
    { id: "subcategoria2", nombre: "Administracion", categoriaId: "651a01d23f0e950ef7991a19" },
    { id: "subcategoria3", nombre: "Finanzas", categoriaId: "651a01d23f0e950ef7991a19" },
    { id: "subcategoria4", nombre: "Contabilidad", categoriaId: "651a01d23f0e950ef7991a19" },

    { id: "subcategoria5", nombre: "Esferos", categoriaId: "651a022c3f0e950ef7991a1b" },
    { id: "subcategoria6", nombre: "Agendas", categoriaId: "651a022c3f0e950ef7991a1b" },
    { id: "subcategoria7", nombre: "Cuadernos", categoriaId: "651a022c3f0e950ef7991a1b" },
    { id: "subcategoria8", nombre: "Libretas", categoriaId: "651a022c3f0e950ef7991a1b" },

    { id: "subcategoria9", nombre: "Camisas", categoriaId: "651a02783f0e950ef7991a1d" },
    { id: "subcategoria10", nombre: "Busos", categoriaId: "651a02783f0e950ef7991a1d" },
    { id: "subcategoria11", nombre: "Chaquetas", categoriaId: "651a02783f0e950ef7991a1d" },
    { id: "subcategoria12", nombre: "Chalecos", categoriaId: "651a02783f0e950ef7991a1d" },
    { id: "subcategoria13", nombre: "Gorras", categoriaId: "651a02783f0e950ef7991a1d" },
    { id: "subcategoria14", nombre: "Botas", categoriaId: "651a02783f0e950ef7991a1d" },

    { id: "subcategoria15", nombre: "Bebidas", categoriaId: "651a02cf3f0e950ef7991a20" },
    { id: "subcategoria16", nombre: "Bolsos", categoriaId: "651a02cf3f0e950ef7991a20" },
    { id: "subcategoria17", nombre: "Llaveros", categoriaId: "651a02cf3f0e950ef7991a20" },
    { id: "subcategoria18", nombre: "Canguros", categoriaId: "651a02cf3f0e950ef7991a20" },
    { id: "subcategoria19", nombre: "Oficina", categoriaId: "651a02cf3f0e950ef7991a20" },
    { id: "subcategoria20", nombre: "Paraguas", categoriaId: "651a02cf3f0e950ef7991a20" },
    // Agrega más subcategorías aquí
  ];
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState("");


  const formik = useFormik({
    initialValues: {
      name: '', 
      description: '', 
      price: 0, 
      images: filea,
      stock: 0, 
      availability: estado, 
      category: '', 
      subcategory: '' ,
      submit: null
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(255)
        .required('El nombre es requerido'),
      description: Yup
      .string()
      .max(255)
      .required('La descripcion es requerida'),  
      price: Yup
      .number()
      .min(100, 'Precio debe ser mayor o igual a 100 COP')
      .required('Precio es requerido'),
      stock: Yup
      .number()
      .min(1, 'stock debe ser mayor o igual a 1')
      .required('Stock es requerido'),
      category: Yup
      .string()
      .required('Categoría es requerida'),
      subcategory: Yup
      .string()
      .required('SubCategoria es requerida'),
      availability: Yup
      .string()
      .required('Stock es requerido'),
    }),
    onSubmit: async (values, helpers) => {
      const formData = new FormData();
      if (filea) {
        formData.append('image', filea);
      }
      
      // Agrega otros campos al formulario
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('price', values.price);
      formData.append('stock', values.stock);
      formData.append('availability', values.availability);
      formData.append('category', values.category);
      formData.append('subcategory', values.subcategory);
      
      try {
        const response = await fetch(`${API_URL}/products/${id2}`, {
          method: 'PUT',
          body: formData // Usa el objeto FormData en lugar de JSON.stringify
        });
    
        if (response.ok) {
          
          console.log('Solicitud POST exitosa');
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: "Producto agregado"});
          helpers.setSubmitting(false);
        } else {
          // Manejar errores en caso de una respuesta no exitosa
          const errorData = await response.json();
          console.error('Error en la solicitud POST:', errorData);
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: errorData.message });
          helpers.setSubmitting(false);
        }
      } catch (err) {
        // Manejar errores en caso de un error de red u otra excepción
        console.error('Error en la solicitud POST:', err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
    
  });
  
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  
  const [isBoxVisible, setIsBoxVisible] = useState(true);

  const handleCloseBox = () => {
    setIsBoxVisible(false);
  };
  return (
    <>
     {isBoxVisible && (
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '45%',
        transform: 'translate(-20%, -30%)',
        width: 800,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
     
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseBox}
            sx={{
              position: 'absolute',
              top: '28px',
              right: '658px',
            }}
          >
            Cerrar
          </Button>
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Editar Producto
              </Typography>
              <Table>
             
              <TableRow>
              <TableCell> <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Nombre"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                /></TableCell>
               <TableCell>   <TextField
                  error={!!(formik.touched.description && formik.errors.description)}
                  fullWidth
                  helperText={formik.touched.description && formik.errors.description}
                  label="Descripcion"
                  name="description"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.description}
                />
                
                </TableCell>
                <TableCell>   
                <TextField
                  error={!!(formik.touched.price && formik.errors.price)}
                  fullWidth
                  helperText={formik.touched.price && formik.errors.price}
                  label="Precio"
                  name="price"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.price}
                  
                />
                
                </TableCell>

                <TableCell>
                <TextField
                  error={!!(formik.touched.stock && formik.errors.stock)}
                  fullWidth
                  helperText={formik.touched.stock && formik.errors.stock}
                  label="Stock | Existencias"
                  name="stock"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.stock}
                />
                </TableCell>

                <TableCell>
                
                </TableCell>  


                </TableRow>
           </Table>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
              
             
              

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label"
                  >Estado</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={estado}
                   
                    onChange={handleChange}
                    error={!!(formik.touched.availability && formik.errors.availability)}
                   
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="true">Publico</MenuItem>
                    <MenuItem value="false">Privado</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={categoriaSeleccionada}
                    onChange={(e) => {
                      const categoriaId = e.target.value;
                      setCategoriaSeleccionada(categoriaId);
                      formik.setFieldValue('category', categoriaId);
                      // Limpia la subcategoría al cambiar la categoría
                      setSubcategoriaSeleccionada("");
                      
                    }}
                  >
                    <MenuItem value="">
                      <em>Selcciona una categoria</em>
                    </MenuItem>
                    {categorias.map((categoria) => (
                    <MenuItem key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label"> Sub Categoria</InputLabel>
                  <Select
                    labelId="subcategoria-label"
                    id="subcategoria-select"
                    value={subcategoriaSeleccionada}
                    onChange={(e) => {
                      setSubcategoriaSeleccionada(e.target.value)
                      console.log(e.target.value)
                      formik.setFieldValue('subcategory', e.target.value);
                    }}
                    disabled={!categoriaSeleccionada} // Deshabilita si no se ha seleccionado una categoría
                    
                  >
                    <MenuItem value="">
                      <em>Selecciona una subcategoría</em>
                    </MenuItem>
                    {subcategorias 
                      .filter((subcategoria) => subcategoria.categoriaId === categoriaSeleccionada)
                      .map((subcategoria) => (
                        <MenuItem key={subcategoria.id} value={subcategoria.nombre}>
                          {subcategoria.nombre}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload file
                <VisuallyHiddenInput type="file" onChange={handleFileChange}/>
              </Button>
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
      </Box>            
      )}
    </>
   
  );
};

Edit.getLayout = (edit) => (
  <AuthLayout>
    {edit}
  </AuthLayout>
);

export default Edit;
