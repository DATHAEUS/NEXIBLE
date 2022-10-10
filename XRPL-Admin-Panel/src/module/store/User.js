const initialState = {
  signedInUser: undefined,
  users: [],
  usersLength: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SIGNED_IN_USER':
      return {
        ...state,
        signedInUser: action.payload,
      };
    case 'GET_USERS':
      return {
        ...state,
        users: [...state.users, ...action.payload],
      };
    case 'GET_USERS_UPDATE':
      return {
        ...state,
        users: [...action.payload],
      };
    case 'USERS_LENGTH':
      return {
        ...state,
        usersLength: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
export default userReducer;
