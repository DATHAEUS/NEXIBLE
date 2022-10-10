import axios from 'axios';
import { BASE_URL } from './../../constant';

export const getUsers = (page, limit) => {
  return (dispatch) => {
    const token = localStorage.getItem('xrplToken');
    const config = {
      method: 'get',
      // url: `${BASE_URL}/api/v1/admin/user/get?page=${page}`,
      url: `${BASE_URL}/api/v1/admin/user/get?page=${page}&limit=${limit}`,
      headers: {
        token,
      },
    };
    axios(config)
      .then((result) => {
        // console.log('users', result.data.users);
        // console.log('row', result.data);
        if (result.data.users.length) {
          dispatch(getUsersData(result.data.users));
          dispatch(getUsersLength(result.data.usersLength[0].total));
        } else {
          // console.log('no more user found');
          // setIsMore(false);
        }
      })
      .catch((err) => {
        // console.log('err in getting users', err);
      });
  };
};

export const getUsersData = (users) => ({
  type: 'GET_USERS',
  payload: users,
});
export const getUsersLength = (length) => ({
  type: 'USERS_LENGTH',
  payload: length,
});

export const deleteUserFunc = (userId, alert, closeModal, page, limit) => {
  return (dispatch) => {
    const token = localStorage.getItem('xrplToken');
    const config = {
      method: 'delete',
      url: `${BASE_URL}/api/v1/admin/user/delete/${userId}`,
      headers: {
        token,
      },
    };
    axios(config)
      .then((result) => {
        // console.log('deleteUser', result.data);
        alert.success('User deleted successfully');
        dispatch(getUserUpdate(page, limit));
        closeModal(false);
      })
      .catch((e) => {
        // console.log('deleteUserError', e);
        alert.error('Something went wrong');
        closeModal(false);
      });
  };
};

export const editUserFunc = (userId, dataObject, alert, closeModal, page, limit) => {
  return (dispatch) => {
    const token = localStorage.getItem('xrplToken');
    const config = {
      method: 'put',
      url: `${BASE_URL}/api/v1/admin/user/update/${userId}`,
      headers: {
        token,
      },
      data: dataObject,
    };
    axios(config)
      .then((result) => {
        // console.log('editUser', result.data);
        alert.success('User updated successfully');
        dispatch(getUserUpdate(page, limit));
        closeModal(false);
      })
      .catch((e) => {
        // console.log('editUserError', e);
        alert.error('Something went wrong');
        closeModal(false);
      });
  };
};

export const getUserUpdate = (page, limit) => {
  return (dispatch) => {
    const token = localStorage.getItem('xrplToken');
    const config = {
      method: 'get',
      // url: `${BASE_URL}/api/v1/admin/user/get?page=${page}`,
      url: `${BASE_URL}/api/v1/admin/user/get?page=${0}&limit=${page}`,
      headers: {
        token,
      },
    };
    axios(config)
      .then((result) => {
        // console.log('users', result.data.users);
        // console.log('row', result.data);
        if (result.data.users.length) {
          dispatch(setUsersUpdate(result.data.users));
          // dispatch(getUsersLength(result.data.usersLength[0].total));
        } else {
          // console.log('no more user found');
          // setIsMore(false);
        }
      })
      .catch((err) => {
        // console.log('err in getting users', err);
      });
  };
};

export const setUsersUpdate = (update) => ({
  type: 'GET_USERS_UPDATE',
  payload: update,
});
