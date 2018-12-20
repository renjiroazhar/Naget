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
import GarbageIcon from './image/garbage.svg';

const OrderSummary = ({ order }) => {
	return (
		<div>
			<List style={{ width: '100%' }} key={order.id}>
				<ListItem button alignItems="flex-start">
					<ListItemAvatar>
						{order.foto ? (
							<Avatar
								style={{
									borderRadius: '5%',
									width: '45px',
									height: '45px'
								}}
								alt="Remy Sharp"
								src={`${order.foto[0] ? order.foto[0] : ''}`}
							/>
						) : (
							<Avatar
								style={{
									borderRadius: '5%',
									width: '45px',
									height: '45px'
								}}
								alt="Remy Sharp"
								src={<GarbageIcon />}
							/>
						)}
					</ListItemAvatar>
					<ListItemText
						primary={order.logs.name ? order.logs.name : ''}
						secondary={
							<React.Fragment>
								<Typography component="span" color="textPrimary">
									Telah menukarkan sampah sebanyak ...
								</Typography>
								<br />

								{order.logs.status
									? order.logs.status === 'SUCCESS'
										? 'Berhasil'
										: order.logs.status === 'WAITING_CONFIRMATION'
											? 'Menunggu Konfirmasi'
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
							aria-label="Comments"
						>
							<InfoIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			</List>
		</div>
	);
};
export default OrderSummary;
