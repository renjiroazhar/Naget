import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from 'react-swipeable-views';
import ArrowLeft from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import WaitingConfirmation from './OrderList/WaitingConfirmation';
import OrderHistory from './OrderList/OrderHistory';
import FixedNavbar from '../../../../../components/FixedNavbar';
import Toolbar from '@material-ui/core/Toolbar';
import './style/style.css';
import LoginContainer from '../../Login';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  },
  indicator: {
    backgroundColor: '#fecb00ff'
  }
});

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

class OrderContainer extends React.Component {
  state = {
    value: 0,
    orders: []
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  getSafe = (fn, defaultVal) => {
    try {
      return fn();
    } catch (e) {
      return defaultVal;
    }
  };

  handleBack = () => {
    this.props.history.push('/');
  };

  componentDidMount() {
    const { orders } = this.props;
    this.getSafe(() => orders, 'nothing');
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
    console.log(localStorage.getItem('email'));
  }

  render() {
    const { theme, classes } = this.props;
    const { orders } = this.state;
    if (!localStorage.getItem('email')) {
      return (
        <div style={{ textAlign: 'center' }}>
          <FixedNavbar pageName="Order" />
          <LoginContainer />
        </div>
      );
    }
    if (!isLoaded(orders)) {
      return (
        <div
          style={{
            backgroundColor: '#e7e7e7',
            height: '100%'
          }}
        >
          <FixedNavbar pageName="Order" />
          <AppBar style={{ marginTop: '55px' }} color="default">
            <Tabs
              onChange={this.handleChange}
              indicatorColor="primary"
              classes={{
                indicator: classes.indicator
              }}
              textColor="primary"
              variant="fullWidth"
              value={this.state.value}
            >
              <Tab label="Order" style={stylus.tab} />
              <Tab label="History" style={stylus.tab} />
            </Tabs>
          </AppBar>
          <div
            style={{
              textAlign: 'center',
              minHeight: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden'
            }}
          >
            <CircularProgress />
          </div>
        </div>
      );
    }
    if (isEmpty(orders)) {
      return (
        <div
          style={{
            backgroundColor: '#e7e7e7',
            height: '100%'
          }}
        >
          <FixedNavbar pageName="Order" />
          <AppBar style={{ marginTop: '55px' }} color="default">
            <Tabs
              onChange={this.handleChange}
              indicatorColor="primary"
              classes={{
                indicator: classes.indicator
              }}
              textColor="primary"
              variant="fullWidth"
              value={this.state.value}
            >
              <Tab label="Order" style={stylus.tab} />
              <Tab label="History" style={stylus.tab} />
            </Tabs>
          </AppBar>
          <div
            style={{
              textAlign: 'center',
              minHeight: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden'
            }}
          >
            <br />
            No Order
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div style={{ marginBottom: '20%' }}>
            <AppBar color="default" style={{ position: 'fixed' }}>
              <Toolbar style={{ backgroundColor: '#fecb00ff', paddingLeft: 0 }}>
                <IconButton
                  onClick={this.handleBack}
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                >
                  <ArrowLeft style={{ color: '#ffffff' }} />
                </IconButton>

                <Typography
                  variant="title"
                  color="inherit"
                  style={{
                    color: 'white',
                    fontSize: '20px'
                  }}
                >
                  Order
                </Typography>
              </Toolbar>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                classes={{
                  indicator: classes.indicator
                }}
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label="Order" style={stylus.tab} />
                <Tab label="History" style={stylus.tab} />
              </Tabs>
            </AppBar>
            <div style={{ width: '100%', marginTop: '100px' }}>
              <SwipeableViews
                axis={theme === 'rtl' ? 'x-reverse' : 'x'}
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                <TabContainer dir="1">
                  <div>
                    <WaitingConfirmation orders={orders} />
                  </div>
                </TabContainer>
                <TabContainer dir="2">
                  <div>
                    <OrderHistory orders={orders} />
                  </div>
                </TabContainer>
              </SwipeableViews>
            </div>
          </div>
        </div>
      );
    }
  }
}

OrderContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

const stylus = {
  tab: {
    border: 'none',
    borderColor: '#fecb00ff',
    borderBottomColor: 'white',
    color: 'black',
    fontWeight: 'normal'
  }
};

export default withStyles(styles)(withRouter(OrderContainer));
