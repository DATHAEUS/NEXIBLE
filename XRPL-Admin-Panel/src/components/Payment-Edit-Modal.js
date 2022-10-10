import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { editPaymentFunc } from 'src/module/action/payment';
import { useAlert } from 'react-alert';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

function PaymentEditModal({ setIsOpen, userId, userData, open, closeEditModal, editPaymentFunc, page, limit }) {
  const [dataObject, setDataObject] = React.useState({
    // first_name: userData?.first_name ? userData?.first_name : '',
    // last_name: userData?.last_name ? userData?.last_name : '',
    // email: userData?.email ? userData?.email : '',
    // status: userData?.status ? userData?.status : '',
    xrp_send: userData?.xrp_send ? userData?.xrp_send : '',
    verified: userData?.verified ? userData?.verified : '',
  });
  const alert = useAlert();
  const handleClose = () => {
    closeEditModal(false);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    // console.log({
    //   name,
    //   value,
    // });
    setDataObject((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  React.useEffect(() => {
    setIsOpen(false);
    // console.log(page);
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Edit'}</DialogTitle>
        <DialogContent>
          <Grid>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6}>
                  <Item>
                    <InputLabel id="demo-simple-select-label">Verified</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={dataObject?.verified}
                      onChange={handleInputChange}
                      label="verified"
                      name="verified"
                      // sx={{ m: 1, width: 150 }}
                      style={{ m: 1, width: '190px' }}
                    >
                      <MenuItem value={'true'}>True</MenuItem>
                      <MenuItem value={'false'}>False</MenuItem>
                    </Select>
                  </Item>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Item>
                    <InputLabel id="demo-simple-select-label">Send Payment</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={dataObject?.xrp_send}
                      onChange={handleInputChange}
                      label="xrp_send"
                      name="xrp_send"
                      // sx={{ m: 1, width: 150 }}
                      style={{ m: 1, width: '190px' }}
                    >
                      <MenuItem value={'true'}>True</MenuItem>
                      <MenuItem value={'false'}>False</MenuItem>
                    </Select>
                  </Item>
                </Grid>
              </Grid>
            </Box>
            {/* <Grid item>
              <TextField
                name="verified"
                style={{ margin: '10px' }}
                label="Verified"
                value={dataObject?.verified}
                onChange={handleInputChange}
                variant="standard"
              />
              <TextField
                name="xrp_send"
                style={{ margin: '10px' }}
                label="Send Payment"
                value={dataObject?.xrp_send}
                onChange={handleInputChange}
                variant="standard"
              />
            </Grid> */}
            {/* <Grid item>
              <TextField
                name="email"
                style={{ margin: '10px' }}
                label="Email"
                value={dataObject?.email}
                onChange={handleInputChange}
                variant="standard"
              />
              <TextField
                name="status"
                style={{ margin: '10px' }}
                label="Status"
                value={dataObject?.status}
                onChange={handleInputChange}
                variant="standard"
              />
            </Grid> */}
          </Grid>
          <DialogActions>
            <Button onClick={handleClose} color="error">
              Close
            </Button>
            <Button
              onClick={() => {
                editPaymentFunc(userId, dataObject, alert, closeEditModal, page, limit);
              }}
            >
              Save
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  // mintingLoader: state.wallet.mintingLoader,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ editPaymentFunc }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PaymentEditModal);
