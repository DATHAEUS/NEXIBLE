import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { editUserFunc } from 'src/module/action/user-task';
import { useAlert } from 'react-alert';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
function EditModal({ setIsOpen, userId, userData, open, closeEditModal, editUserFunc, page, limit }) {
  const [dataObject, setDataObject] = React.useState({
    first_name: userData?.first_name ? userData?.first_name : '',
    last_name: userData?.last_name ? userData?.last_name : '',
    email: userData?.email ? userData?.email : '',
    status: userData?.status ? userData?.status : '',
  });
  // console.log(userData);
  const alert = useAlert();
  const handleClose = () => {
    closeEditModal(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setDataObject((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   // textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));
  const handleChange = (e) => {
    // console.log(e.target.value);
    setDataObject((pre) => ({
      ...pre,
      status: e.target.value,
    }));
  };
  React.useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Edit'}</DialogTitle>
      <DialogContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              {/* <Item> */}
              <TextField
                name="first_name"
                label="First Name"
                value={dataObject?.first_name}
                onChange={handleInputChange}
                variant="standard"
              />
              {/* </Item> */}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              {/* <Item> */}
              <TextField
                name="last_name"
                label="Last Name"
                value={dataObject?.last_name}
                onChange={handleInputChange}
                variant="standard"
              />
              {/* </Item> */}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              {/* <Item> */}
              <TextField
                name="email"
                label="Email"
                value={dataObject?.email}
                onChange={handleInputChange}
                variant="standard"
                disabled
              />
              {/* </Item> */}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              {/* <Item> */}
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dataObject?.status}
                label="Status"
                onChange={handleChange}
                style={{ m: 1, width: '190px' }}
              >
                <MenuItem value={'Active'}>Active</MenuItem>
                <MenuItem value={'Disable'}>Disable</MenuItem>
              </Select>
              {/* </Item> */}
            </Grid>
          </Grid>
        </Box>
        {/* <Grid>
            <Grid item>
              <TextField
                name="first_name"
                label="First Name"
                value={dataObject?.first_name}
                onChange={handleInputChange}
                variant="standard"
              />
              <TextField
                name="last_name"
                style={{ margin: '10px' }}
                label="Last Name"
                value={dataObject?.last_name}
                onChange={handleInputChange}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <TextField
                name="email"
                style={{ margin: '10px' }}
                label="Email"
                value={dataObject?.email}
                onChange={handleInputChange}
                variant="standard"
                disabled
              />
              <Box sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={'age'}
                  label="Age"
                  onChange={'handleChange'}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Box>
            </Grid>
          </Grid> */}
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Close
          </Button>
          <Button
            onClick={() => {
              // console.log(dataObject);
              editUserFunc(userId, dataObject, alert, closeEditModal, page, limit);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  // mintingLoader: state.wallet.mintingLoader,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ editUserFunc }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
