import { useState, useEffect } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
// import PRODUCTS from '../_mock/products';
import { BASE_URL } from './../constant';
import axios from 'axios';
import { useSelector, connect } from 'react-redux';
import { useAlert } from 'react-alert';
import { bindActionCreators } from 'redux';
import { GetAllNfts } from './../module/action/nfts';
import InfiniteScroll from 'react-infinite-scroller';
import ReactSpinner from '../components/React-Spinner';
// ----------------------------------------------------------------------

function EcommerceShop(props) {
  const [openFilter, setOpenFilter] = useState(false);
  const nfts = useSelector((state) => state.Nft.nfts);
  const nftLength = useSelector((state) => state.Nft.nftLength);
  // const [page, setPage] = useState(0);
  const [isMore, setIsMore] = useState(true);

  let alert = useAlert();
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // useEffect(() => {
  //   props.GetAllNfts(page, alert, setIsMore);
  // }, []);
  const loadMore = () => {
    //  setPage(nfts.length);
    props.GetAllNfts(nfts.length, alert, checkMore);
  };
  const checkMore = (more) => {
    setIsMore(false);
  };
  return (
    <Page title="Dashboard: Products">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
          <Typography variant="h4" gutterBottom>
            NFTS
          </Typography>
          {/* <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <InfiniteScroll
          pageStart={0}
          // dataLength={nftLength} //This is important field to render the next data
          loadMore={loadMore}
          hasMore={isMore}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Noyhing Found</b>
            </p>
          }
          loader={
            <Typography
              key={313}
              style={{
                margin: 'auto',
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {/* Loading... */}
              <ReactSpinner />
            </Typography>
          }
          // endMessage={
          //   <p style={{ textAlign: 'center' }}>
          //     <b>Yay! You have seen it all</b>
          //   </p>
          // }
          // below props only if you need pull down functionality
          // refreshFunction={this.refresh}
          // pullDownToRefresh
          // pullDownToRefreshThreshold={50}
          // pullDownToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>}
          // releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}
        >
          <ProductList products={nfts} />
        </InfiniteScroll>
        {/* <ProductCartWidget /> */}
      </Container>
    </Page>
  );
}

const mapStateToProps = (state) => ({
  // mintingLoader: state.wallet.mintingLoader,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      GetAllNfts,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(EcommerceShop);
