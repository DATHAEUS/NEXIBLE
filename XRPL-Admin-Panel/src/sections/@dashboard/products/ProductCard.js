import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/Label';
import { ColorPreview } from '../../../components/color-utils';
import { BASE_URL } from './../../../constant';
import './ProductCard.css';
// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { title, nft_img, amount, description, Issuer, actualPrice, colors, nftType, priceSale } = product;

  return (
    <Card
    // style={{ maxHeight: '389px' }}
    >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {nftType && (
          <Label
            variant="filled"
            color={(nftType === 'sell' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {nftType}
          </Label>
        )}
        <ProductImgStyle alt={title} src={nft_img} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        {/* <Link to="#" color="inherit" underline="hover" component={RouterLink}> */}
        <Typography variant="subtitle2" noWrap>
          {title}
        </Typography>
        <span className="nftDescription">{description}</span>
        {/* </Link> */}

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
            {(amount ? amount / 1000000 : '0.00') + ' XRP'}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
