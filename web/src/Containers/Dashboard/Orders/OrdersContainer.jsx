import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import firebase from '../../../services/firebaseConfig';

function TabContainer({ children, dir }) {
	return (
		<Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
			{children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
	dir: PropTypes.string.isRequired
};

const styles = theme => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: '100%',
		flexGrow: 1
	}
});

class OrdersContainer extends React.Component {
	constructor(props) {
		super(props);
		this.ref = firebase.firestore().collection('orders');
		this.unsubscribe = null;
	}
	state = {
		value: 0,
		boards: []
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	onCollectionUpdate = querySnapshot => {
		const boards = [];
		querySnapshot.forEach(doc => {
			const { title, description, author } = doc.data();
			boards.push({
				key: doc.id,
				doc, // DocumentSnapshot
				title,
				description,
				author
			});
		});
		this.setState({
			boards
		});
		console.log(this.state);
	};

	componentDidMount() {
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
	}

	render() {
		const { classes, theme } = this.props;

		return (
			<div className={classes.root}>
				<br />
				<br />
				<br />
				<AppBar
					position="relative"
					color="default"
					style={{ marginTop: '6px' }}
				>
					<Tabs
						value={this.state.value}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						fullWidth
					>
						<Tab label="On Process" />
						<Tab label="Done" />
					</Tabs>
				</AppBar>
				<SwipeableViews
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={this.state.value}
					onChangeIndex={this.handleChangeIndex}
				>
					<TabContainer dir={theme.direction}>Item One</TabContainer>
					<TabContainer dir={theme.direction}>Item Two</TabContainer>
				</SwipeableViews>
			</div>
		);
	}
}

OrdersContainer.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(OrdersContainer);
