import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
// import POSTS from '../_mock/blog';
import { useEffect, useState } from 'react';
import { getBlog } from 'src/module/action/blog';
import { connect, useDispatch, useSelector } from 'react-redux';
import { faker } from '@faker-js/faker';
import ReactSpinner from 'src/components/React-Spinner';
import InfiniteScroll from 'react-infinite-scroller';
import { bindActionCreators } from 'redux';
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

function Blog(props) {
  const blogLength = useSelector((e) => e.Blog.blogLength);
  const blogData = useSelector((e) => e.Blog.blogData);
  const [POSTS, SETPOSTS] = useState([]);
  const [page, setPage] = useState(0);
  const [isMore, setIsMore] = useState(true);

  // useEffect(() => {
  //   dispatch(getBlog(blogData.length, setIsMore));
  // }, []);

  useEffect(() => {
    if (blogData.length) {
      let fixedData = [...blogData].map((data, index) => ({
        id: data._id,
        cover: data.blogImage,
        title: data.blogTitle,
        createdAt: data.createdAt,
        view: faker.datatype.number(),
        comment: faker.datatype.number(),
        share: faker.datatype.number(),
        favorite: faker.datatype.number(),
        author: {
          name: data.user.first_name + ' ' + data.user.last_name,
          avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
        },
      }));
      setPage(blogData.length);
      SETPOSTS(fixedData);
    }
  }, [blogData]);

  const loadMore = () => {
    // console.log('load more', blogData.length);
    if (page === blogData.length) {
      props.getBlog(blogData.length, checkMore);
    }
  };

  const checkMore = (more) => {
    setIsMore(false);
  };
  return (
    <Page title="Dashboard: Blog">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/AddBlog"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Blog
          </Button>
        </Stack>
        <br />
        {/* 
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack> */}

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

          // pullDownToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>}
          // releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}
        >
          <Grid container spacing={3}>
            {POSTS.length ? (
              POSTS.map((post, index) => <BlogPostCard key={post.id} post={post} index={index} />)
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
        </InfiniteScroll>
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
      getBlog,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Blog);
