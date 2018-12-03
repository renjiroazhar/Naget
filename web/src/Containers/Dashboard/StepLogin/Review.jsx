import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`
  },
  total: {
    fontWeight: '700'
  },
  title: {
    marginTop: theme.spacing.unit * 2
  }
});

function Review(props) {
  const { classes } = props;
  console.log(props.allData.database[0]);
  let data = props.allData.database[0];
  let secondData = props.allData.database[1];
  console.log(props.allData.database[1]);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
			</Typography>
      <List disablePadding>
        <div>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Nama Lengkap" secondary="" />
            <Typography variant="body2">{data.name}</Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Nomor Telephone" secondary="" />
            <Typography variant="body2">{data.phone}</Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Alamat" secondary="" />
            <Typography variant="body2">{data.address}</Typography>
          </ListItem>
        </div>
        <div>
          <h4>Gambar :</h4>
          {secondData.downloadURLs.map(res => {
            return (
              <img
                src={res}
                alt=""
                styles={{
                  padding: '20px',
                  width: '100%',
                  maxWidth: '200px',
                  height: '100%',
                  maxHeight: '200px'
                }}
              />
            );
          })}
        </div>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $34.06
					</Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}

Review.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Review);