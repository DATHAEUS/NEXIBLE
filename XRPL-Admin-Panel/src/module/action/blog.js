import axios from 'axios';
import { BASE_URL } from './../../constant';

// add Blog
export const addBlogDataLoader = (bool) => ({
  type: 'ADD_BLOG_LOADER',
  payload: bool,
});

export const addBlog = (data, clearState, alert) => {
  return async (dispatch) => {
    dispatch(addBlogDataLoader(true));
    const token = localStorage.getItem('xrplToken');
    var config = {
      method: 'post',
      url: `${BASE_URL}/api/v1/admin/blog`,
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        dispatch(addBlogDataLoader(false));
        alert.success('Blog Added Successfully');
        clearState();
      })
      .catch(function (error) {
        dispatch(addBlogDataLoader(false));
        alert.success(error.response.data.message);
        // console.log(error.response);
      });
  };
};

export const updateBlog = (data, clearState, alert, id, navigation) => {
  return async (dispatch) => {
    dispatch(addBlogDataLoader(true));
    const token = localStorage.getItem('xrplToken');
    var config = {
      method: 'put',
      url: `${BASE_URL}/api/v1/admin/blog/${id}`,
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        dispatch(addBlogDataLoader(false));
        dispatch(getBlog());
        alert.success('Blog Added Successfully');
        clearState();
        navigation(-1);
      })
      .catch(function (error) {
        dispatch(addBlogDataLoader(false));
        alert.success(error.response.data.message);
        // console.log(error.response);
      });
  };
};

export const addBlogData = (payload) => ({
  type: 'GET_SIGNED_IN_USER',
  payload: payload,
});

// get Blog
export const getBlogDataLoader = (bool) => ({
  type: 'GET_BLOG_LOADER',
  payload: bool,
});

export const getBlog = (page, checkMore) => {
  return async (dispatch) => {
    // console.log('getBlog', page);
    // dispatch(getBlogDataLoader(true));
    const token = localStorage.getItem('xrplToken');
    var config = {
      method: 'get',
      url: `${BASE_URL}/api/v1/admin/blog?page=${page}`,
      headers: {
        token: token,
      },
    };
    axios(config)
      .then((response) => {
        // dispatch(getBlogDataLoader(false));
        // console.log(response.data);
        if (response.data.blogs.length) {
          dispatch(getBlogData(response.data.blogs));
          dispatch(getBlogLength(response.data.blogLength[0].total));
          return;
        } else {
          checkMore(false);
          return;
        }
      })
      .catch(function (error) {
        // dispatch(getBlogDataLoader(false));
        // console.log(error);
        return;
      });
  };
};

export const getBlogData = (payload) => ({
  type: 'GET_BLOG_DATA',
  payload: payload,
});
export const getBlogLength = (payload) => ({
  type: 'BLOG_LENGTH',
  payload: payload,
});

// update Blog
export const getSingleBlogDataLoader = (bool) => ({
  type: 'GET_BLOG_LOADER',
  payload: bool,
});

export const getSingleBlog = (id) => {
  return async (dispatch) => {
    dispatch(getSingleBlogDataLoader(true));
    const token = localStorage.getItem('xrplToken');
    var config = {
      method: 'get',
      url: `${BASE_URL}/api/v1/admin/blog/single/${id}`,
      headers: {
        token: token,
      },
    };

    axios(config)
      .then(function (response) {
        dispatch(getSingleBlogDataLoader(false));
        // console.log(response.data.blog);
        dispatch(getSingleBlogData(response.data.blog));
      })
      .catch(function (error) {
        dispatch(getSingleBlogDataLoader(false));
        // console.log(error);
      });
  };
};

export const getSingleBlogData = (payload) => ({
  type: 'GET_SINGLE_BLOG_DATA',
  payload: payload,
});
