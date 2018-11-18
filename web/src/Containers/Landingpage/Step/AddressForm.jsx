import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    root: {
        width: '100%',

        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    button: {
        margin: theme.spacing.unit,
        backgroundColor: "#00c43e",
         "&:hover": {
            backgroundColor: "#0069d9",
            borderColor: "#0062cc",
            color: "white",
        },
        "&:active": {
            boxShadow: "none",
            backgroundColor: "#0062cc",
            borderColor: "#005cbf"
        },
        "&:focus": {
            boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
        },
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
      },
});


class AddressForm extends React.Component {
    state = {
        open: false,
        secondary: false,
        name: "",
        telephone: "",
        address: "",
        area: ""
    };

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state);
    }

    render() {
        const { secondary } = this.state;
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Nama"
                            fullWidth
                            autoComplete="fname"
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="telephone"
                            name="telephone"
                            label="Nomor WhatsApp"
                            fullWidth
                            autoComplete="fname"
                            onChange={this.handleChange}
                            value={this.state.telephone}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address"
                            name="address"
                            label="Alamat"
                            fullWidth
                            autoComplete="billing address-line1"
                            onChange={this.handleChange}
                            value={this.state.address}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Area"
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Add">
                                        <AddIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>


                    </Grid>
                    <Grid item xs={12}>
                        <Button style={{marginBottom : "100px"}} variant="contained" color="primary" className={classes.button}>
                        LOKASI TERKINI
                            <AddIcon className={classes.rightIcon}/>
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }


}

AddressForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddressForm);