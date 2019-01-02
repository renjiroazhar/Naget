import React, { Component } from 'react';
import './style/home.css';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Carousel from './Carousel';
import Button from '@material-ui/core/Button';
import Logo from '../../../assets/img/moretrash.jpg';
import TooltipButton from '../../../component/TooltipButton';

const styles = theme => ({
	cssRoot: {
		color: '#FFFFFF',
		backgroundColor: '#00c43e',
		width: '90%',
		maxWidth: '380px',
		height: '',
		fontWeight: 400,
		'&:hover': {
			backgroundColor: '#00c43e'
		}
	}
});

class Homepage extends Component {
	state = {
		open: false
	};

	handleClick = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;
		return (
			<div className="home">
				<div className="container">
					<img
						src={Logo}
						srcSet={Logo}
						width="151"
						height="40"
						alt="Moretrash Logo"
						retina_logo_url=""
						className="moretrash-logo"
					/>

					<div style={{ textAlign: 'center', marginTop: '10%' }}>
						<div style={{ textAlign: 'center' }}>
							<div className="carousel-center">
								<Carousel />
							</div>
						</div>
					</div>
					<br />
					<Button
						variant="contained"
						color="primary"
						className={classes.cssRoot}
						onClick={() => this.props.history.push('/form')}
						size="large"
					>
						Pick Trash
					</Button>
					<br />
					<br />
					<Button
						variant="contained"
						color="primary"
						className={classes.cssRoot}
						onClick={() => this.props.history.push('/login')}
						size="large"
					>
						Login
					</Button>
				</div>
				<div>
					<TooltipButton />
				</div>
			</div>
		);
	}
}

Homepage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Homepage));
