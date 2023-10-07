import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';

const Page = () => {

  const [estado, setEstado] = React.useState('');
  const [categoria, setCategoria] = React.useState('');

  const handleChange = (event) => {
 
    setEstado(event.target.value);
    formik.setFieldValue('role', event.target.value);
    console.log("hola . " + event.target.value)
  };
  

  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
      phone: '',
      role:'',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
        lastname: Yup
        .string()
        .max(255)
        .required('Name is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required'),
      phone: Yup
      .string()
      .max(255)
      .required('Phone is required'),
      role: Yup
      .string()
      .max(255)
      .required('Role is required'),
    }),
    onSubmit: async (values, helpers) => {
      console.log(values.role)
      const formData = new FormData();

      formData.append('name', values.name);
      formData.append('description', values.lastname);
      formData.append('price', values.password);
      formData.append('stock', values.phone);
      formData.append('availability',values.role);
      

      try {
        const response = await fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.name,
            lastname: values.lastname,
            email: values.email,
            password: values.password,
            phone: values.phone,
            role: values.role,
          }),
        });
    
        if (response.ok) {
          // Si la respuesta del servidor es exitosa (código 200),
          // puedes redirigir al usuario a otra página (por ejemplo, '/')
          router.push('/');
        } else {
          // Si la respuesta del servidor no es exitosa, maneja el error
          const errorData = await response.json();
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: errorData.message });
          helpers.setSubmitting(false);
        }
      } catch (err) {
        // Si hay un error en la solicitud, maneja el error
        console.error('Error en la solicitud POST:', err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    
    }
  });

  return (
    <>
      <Head>
        <title>
          Register
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
                Register
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Already have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Log in
                </Link>
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
                  error={!!(formik.touched.lastname && formik.errors.lastname)}
                  fullWidth
                  helperText={formik.touched.lastname && formik.errors.lastname}
                  label="Apellido"
                  name="lastname"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                <TextField
                  error={!!(formik.touched.phone && formik.errors.phone)}
                  fullWidth
                  helperText={formik.touched.phone && formik.errors.phone}
                  label="Telefono"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.phone}
                />
                 <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label"
                  >Rol</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={estado}
                    
                    onChange={handleChange}
                  
                  >
                    <MenuItem value="">
                      <em>Selecione un rol</em>
                    </MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="seller">Vendedor</MenuItem>
                  </Select>
                </FormControl>
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
