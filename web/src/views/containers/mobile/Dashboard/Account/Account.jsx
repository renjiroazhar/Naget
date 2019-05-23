import React from 'react';
import EditProfil from './AccountEdit/Dialog/EditProfil';
import About from './AccountEdit/Dialog/About';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import FixedNavbar from '../../../../components/FixedNavbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoginContainer from '../Login';
class Account extends React.Component {
  state = {
    open: false,
    isOpen: false
  };

  logout = () => {
    localStorage.clear()
    this.props.history.push('/account');
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    if (!localStorage.getItem('userId')) {
      return (
        <div style={{ textAlign: 'center' }}>
          <FixedNavbar pageName="Account" />
          <LoginContainer />
        </div>
      );
    }
    return (
      <div
        style={{
          backgroundColor: '#e7e7e7',
          overflow: 'hidden',
          height: '100%',
          minHeight: '100vh'
        }}
      >
        <FixedNavbar pageName="Account" />
        <div style={{ marginTop: '57px', marginBottom: '15px' }}>
          <EditProfil />
        </div>
        <Divider />
        <div>
          <About />
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'You sure want to leave?'}
          </DialogTitle>
          <DialogActions>
            <Button
              varian="contained"
              onClick={this.handleClose}
              color="primary"
            >
              No
            </Button>
            <Button
              varian="contained"
              onClick={this.logout}
              color="primary"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <div
          style={{
            width: '100%'
          }}
        >
          <Button
            variant="contained"
            style={{
              backgroundColor: '#f43c3c',
              width: '100%',
              textAlign: 'center',
              color: '#ffffff',
              height: '46px',
              borderRadius: 'unset'
            }}
            onClick={this.handleClickOpen}
          >
            Logout
          </Button>
        </div>
      </div >
    );
  }
}

export default withRouter(Account);
