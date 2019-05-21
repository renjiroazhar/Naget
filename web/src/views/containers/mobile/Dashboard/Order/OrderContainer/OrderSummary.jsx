import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const OrderSummary = ({ order }) => {
	return (
		<div>
			{order ? (
				<List style={{ width: '100%' }} key={order.id}>
					<ListItem button alignItems="flex-start">
						<ListItemAvatar>
								<Avatar
									style={{
										borderRadius: '5%',
										width: '45px',
										height: '45px'
									}}
									alt="Remy Sharp"
									src=""
								/>
							)}
						</ListItemAvatar>
						<ListItemText
							primary={order.variant}
							secondary={
								<React.Fragment>
									<Typography component="span" color="textPrimary">
										{order.total}
									</Typography>
									<br />

									{order.status
										? order.status === 'SUCCESS'
											? 'Success'
											: order.status === 'PROCESSED_BY_ADMIN'
												? 'On Process'
												: order.status === 'CANCELED_BY_USER'
													? 'Canceled'
														: ''
										: ''}
								</React.Fragment>
							}
						/>
						<ListItemSecondaryAction>
							<IconButton
								onClick={() => {
									this.props.history.push(`/order/${order.id}`);
								}}
								aria-label="Order detail"
							>
								<InfoIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
			) : (
				[]
			)}
		</div>
	);
};

export default OrderSummary;
