import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import CarouselTestimoni from './Carousel';
import HeaderTestimoni from './Header';
import PaperSheet from './PaperSheet';

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
    color: '#1abc9c'
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
});



class TestimoniContainer extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <HeaderTestimoni />
                <PaperSheet /> 
            <Typography variant="h6" className={classes.title}>
              TESTIMONI
            </Typography>
            <center>   
             <CarouselTestimoni />
            </center>

        
      </div>
    );
  }
}

TestimoniContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TestimoniContainer);