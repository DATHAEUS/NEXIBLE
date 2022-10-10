const initialState = {
  blogLoader: false,
  blogData: [],
  singleBlog: false,
  blogLength: 0,
};

const BlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BLOG_LOADER':
      return {
        ...state,
        blogLoader: action.payload,
      };

    case 'GET_BLOG_DATA':
      return {
        ...state,
        blogData: [...state.blogData, ...action.payload],
      };

    case 'GET_SINGLE_BLOG_DATA':
      return {
        ...state,
        singleBlog: action.payload,
      };

    case 'BLOG_LENGTH':
      return {
        ...state,
        blogLength: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
export default BlogReducer;
