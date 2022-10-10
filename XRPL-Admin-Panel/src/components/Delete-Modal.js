import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteUserFunc } from 'src/module/action/user-task';
import { useAlert } from 'react-alert';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function DeleteMoad({ setIsOpen, userId, open, closeDelModal, deleteUserFunc, page, limit }) {
  React.useEffect(() => {
    setIsOpen(false);
  }, []);
  const alert = useAlert();
  const handleClose = () => {
    closeDelModal(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You want to delete this user</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Disagree
          </Button>
          <Button
            onClick={() => {
              deleteUserFunc(userId, alert, closeDelModal, page, limit);
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  // mintingLoader: state.wallet.mintingLoader,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ deleteUserFunc }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeleteMoad);
