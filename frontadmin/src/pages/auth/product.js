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


const Page = () => {

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log("Archivo seleccionado:", selectedFile.name);
      // Puedes almacenar el archivo seleccionado en una constante si lo deseas
      // const archivoSeleccionado = selectedFile;
      // Aquí puedes realizar otras acciones con el archivo, como cargarlo en tu aplicación.
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

  const formik = useFormik({
    initialValues: {
      name: '', 
      description: '', 
      price: 0, 
      images: ["imagen1.jpg"],
      stock: 0, 
      availability: estado, 
      category: '', 
      subcategory: 'fsdf' ,
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
      availability: Yup
      .string()
      .required('Stock es requerido'),
    }),
    onSubmit: async (values, helpers) => {
      console.log("holaaaaaaa")
      const postData = {
        name: values.name,
        description: values.description,
        price: values.price,
        images: values.images,
        stock: values.stock,
        availability: values.availability,
        category: values.category,
        subcategory: values.subcategory
      };
    
      try {
        const response = await fetch('http://localhost:3001/products/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
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
  

  return (
    <>
      <Head>
        <title>
          Register | Devias Kit
        </title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
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
                Guardar Producto
              </Typography>
           
           
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Nombre"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <TextField
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

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label"
                  >Estado</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={estado}
                   
                    onChange={handleChange}
                    error={!!(formik.touched.availability && formik.errors.availability)}
                    helperText={formik.touched.availability && formik.errors.availability}
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
                    value={categoria}
                    onChange={handleChange2}
                    error={!!(formik.touched.stock && formik.errors.stock)}
                    helperText={formik.touched.stock && formik.errors.stock}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="651a01d23f0e950ef7991a19">Libros</MenuItem>
                    <MenuItem value="651a02783f0e950ef7991a1d">Ropa</MenuItem>
                    <MenuItem value="651a022c3f0e950ef7991a1b">Papeleria</MenuItem>
                    <MenuItem value="651a02cf3f0e950ef7991a20">Accesorios</MenuItem>
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
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
