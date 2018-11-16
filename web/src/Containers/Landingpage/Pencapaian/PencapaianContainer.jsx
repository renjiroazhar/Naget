import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import HeaderTestimoni from './Header';
import PaperSheet from './PaperSheet';import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import ChatBubble from "@material-ui/icons/Chat";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    color: '#1abc9c',
    fontSize: '67px' ,
    textAlign: 'center'
},
  card: {
    maxWidth: 400,
    textAlign : "center"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  sub: {
    fontSize: '24px'
  },
  fab: {
    margin: theme.spacing.unit * 2
  },
  absolute: {
   position: "fixed",
    color: "#00c43e",
    backgroundColor: "#00c43e",
    bottom: theme.spacing.unit * 5,
    right: theme.spacing.unit * 5,
  },
  margin: {
    margin: theme.spacing.unit,
    maxWidth: "350px",
    width: "100%",
    borderRadius : 0,
    fontWeight: 400,
    color: "white",
    backgroundColor: "#00c43e",
    textDecoration: "none"
  },
  iconchat: {
    color: "#fff",
    "&:hover": {
      color: "#00c43e"
    }
  }
});



class PencapaianContainer extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} style={{width: '100%', height: '100%', margin: 0, overflow : 'hidden' }}>
      <HeaderTestimoni />
                <PaperSheet /> 
                <div>
            <p className={classes.title}>
              2
            </p>
           <p className={classes.sub}>Mitra</p>
           </div>
           <div>
            <p className={classes.title}>
              433
            </p>
           <p className={classes.sub}>Order</p>
           </div>
           <div>
            <p className={classes.title}>
              4533
            </p>
           <p className={classes.sub}>Kg</p>
           </div>
           <Tooltip>
            <Button variant="fab" color="#00c43e" id="tooltip" className={classes.absolute}>
              <ChatBubble className={classes.iconchat} />
            </Button>
          </Tooltip>
      </div>
    );
  }
}

PencapaianContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PencapaianContainer);