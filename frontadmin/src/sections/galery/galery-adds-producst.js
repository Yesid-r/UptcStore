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
import {API_URL} from '../../utils/constants'

export const GaleryAddsProducts = (props) => {
  const [products, setProducts] = useState([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const {sx } = props;
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


  return (
    <Card sx={sx}>
      <CardHeader title="Latest Products" />
      <List>
        {products.map((product, index) => {
          const hasDivider = index < products.length - 1;
          const updatedAt = new Date(product.updatedAt);
          const ago = formatDistanceToNow(updatedAt);
          
          return (
            <ListItem
              divider={hasDivider}
              key={product._id}
            >
              <ListItemAvatar>
                {
                  product.images
                    ? (
                      <Box
                        component="img"
                        src={product.images.secure_url}
                        sx={{
                          borderRadius: 1,
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                    : (
                      <Box
                        sx={{
                          borderRadius: 1,
                          backgroundColor: 'neutral.200',
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                }
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Updated ${ago} ago`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

GaleryAddsProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};
