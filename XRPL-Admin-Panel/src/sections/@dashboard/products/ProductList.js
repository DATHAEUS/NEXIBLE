import PropTypes from 'prop-types';
// material
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ShopProductCard from './ProductCard';
import ReactSpinner from 'src/components/React-Spinner';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ products, ...other }) {
  // console.log(products);
  return (
    <Grid container spacing={3} {...other}>
      {products.length ? (
        products?.map((product) => (
          <Grid key={product._id} item xs={12} sm={6} md={3}>
            <ShopProductCard product={product} />
          </Grid>
        ))
      ) : (
        <Typography
          style={{
            display: 'block',
            margin: 'auto',
          }}
        >
          {/* Loading... */}
          {/* <ReactSpinner /> */}
        </Typography>
      )}
    </Grid>
  );
}
