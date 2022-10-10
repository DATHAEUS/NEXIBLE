import axios from 'axios';
import { BASE_URL } from '../../constant';

// Authorize user with token
export const authorizeUser = (navigate) => {
  return (dispatch) => {
    const userToken = localStorage.getItem('xrplToken');
    if (!userToken) {
      dispatch(loginUserData(null));
      navigate('/login');
    }
    const config = {
      method: 'get',
      url: `${BASE_URL}/api/v1/token/verify?token=${userToken}`,
    };

    axios(config)
      .then((result) => {
        // console.log(result.data);
        if (result.data.user) {
          if (result.data.message === 'Authorized') {
            dispatch(loginUserData(result.data.user));
            // navigate('/dashboard/app');
            return;
          }
        }
      })
      .catch((err) => {
        dispatch(loginUserData(null));
        navigate('/login');
        return;
      });
  };
};

// Signup User
export const signUpUser = async (data, navigate, alert) => {
  // console.log({ signUpUser: data });
  data.type = 'Admin';
  const config = {
    method: 'post',
    url: `${BASE_URL}/api/v1/auth/admin/register`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then((result) => {
      if (result.data.user) {
        // alert(JSON.stringify(result.data.user, 0, 2));
        alert.success('User Created Successfully');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
        return;
      }
    })
    .catch((err) => {
      //   alert(err.response.data.message);
      alert.error(err.response.data.message);
      return;
    });
};

// Login User
export const loginUser = (data, navigate, alert) => {
  return async (dispatch) => {
    // console.log({ loginUser: data });
    delete data.remember;
    const config = {
      method: 'post',
      url: `${BASE_URL}/api/v1/auth/admin/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then((result) => {
        // console.log(result.data);
        if (result.data.token) {
          // alert(JSON.stringify(result.data.user, 0, 2));
          localStorage.setItem('xrplUser', JSON.stringify(result.data.user));
          localStorage.setItem('xrplToken', result.data.token);
          alert.success('Login Successfully');
          dispatch(loginUserData(result.data.user));
          setTimeout(() => {
            navigate('/dashboard/app');
          }, 1500);
          return;
        }
      })
      .catch((err) => {
        //   alert(err.response.data.message);
        alert.error(err.response.data.message);
        dispatch(loginUserData(null));
        return;
      });
  };
};

export const loginUserData = (user) => ({
  type: 'GET_SIGNED_IN_USER',
  payload: user,
});
