import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from 'react-swipeable-views';
import OrderOnProcess from './OrderList/OrderOnProcess';
import OrderHistory from './OrderList/OrderHistory';
import FixedNavbar from '../../../../../components/FixedNavbar';
import './style/style.css';
import LoginContainer from '../../Login';
import axios from 'axios';

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
    orders: [],
    isLoading: false
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

  async componentDidMount() {
    this.setState({
      isLoading: true
    })
    const userId = localStorage.getItem('userId');
    const response = await axios.get(`https://mysqlnaget.herokuapp.com/api/Orders?filter={"where":{"usersId":"${userId}"}}`)
    try {
      this.setState({
        orders: response.data,
        isLoading: false
      })
    } catch (error) {
      alert(error)
      throw new Error(error)
    }
  }

  render() {
    const { theme, classes } = this.props;
    const { orders, isLoading } = this.state;
    if (!localStorage.getItem('accessToken')) {
      return (
        <div style={{ textAlign: 'center' }}>
          <FixedNavbar pageName="Order" />
          <LoginContainer />
        </div>
      );
    }
    if (isLoading) {
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
    } else {
      return (
        <div>
          <div style={{ marginBottom: '20%' }}>
            <FixedNavbar pageName="Order" />
            <AppBar style={{ marginTop: '55px' }} color="default">
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
                    <OrderOnProcess orders={orders} />
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
