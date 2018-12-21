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
			{order
				? (console.log(order),
				  (
						<List style={{ width: '100%' }} key={order.id}>
							<ListItem button alignItems="flex-start">
								<ListItemAvatar>
									{!order.photos ? (
										<Avatar
											style={{
												borderRadius: '5%',
												width: '45px',
												height: '45px'
											}}
											src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAQlBMVEXl5eWWlJXp6emRj5DV1dWpp6jPzs+sq6uko6ShoKDj4+OfnZ7p6unR0dHe3t6PjY7CwcG3trbFxMS5ubnJyMiysbLCkCTsAAAC4klEQVR4nO3c23KqQBBAUWkQiQgoyv//asQLwnBHid3n7PUYhXIXUzAD0c0GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgPlnZt/s2Qbiy9MuBss38VWXBtwt33rp8CimkkMKq8M1TZrtMW6GfJ0nQI2nqe5uz0VZZYXzon30smqRI6usqjD4+u9orO4YUzkfhX6FwOSOFb6xhTRRKmhfF6bJf1Gii8Hyfy8WXJYkWCqNqbnlckKi/UHav6bQfzE/UXxhk3suCU636QilqgV62n71n/YVxvdBPZh9Ea4XhP1gYNQrdzzkerL8wb9yZcF8ev0SqL9xI/RA6F0RJsnws0UBhUB1E/8d9MR6/RO7138WQ8HHDzI+dpytym+2MPHIxUHideO/Kial3am1z+/Dx8DXSQmHZGOZh6rwkp8dn3w2OUxuFtwWi+5djNSE/DSVaKWxvcKlNyIeuGVYLJaxPyLNAZN+TYLRQEucJxfHkZe6p9s5moQSeo3wm40dd7zVZKKkb+Mg8d2xtsjCNuws7M0wW9gVer/7tzS0WRu3noNVBbN+rMli47Q+8ak3EzRXWb711aZ1PrRU+J6PTx6mxQjmPBJbjtLmJiUJJk/vC4jXbHhqnzV1YKJTjdQm8S6/LiwlHsDVODRQ+uvyo8KYEXt/ZmJ/qL5RjNlDTqbET9YVymR3YHKfa77VJOG1kOmrjVHmhJEv6PG/72o3uwvY6cCL/daNYdWHfOnBKYjVONRe+EVgbp5oL9/3rwHHV/TfFhW8FetX5VHFhvOg6UXneCtdbOLCSn5h4OZT7UVs4vJKf5vbIRmmhFB8I9ItyZzoLF8y2u9y+66SzcDPt//BHladTpYUfROFfoXC5/6BQ2V0Mb8Y3ng+96u/KtRV6cfwzUdzr/npUek7fFRWuhEIKKaRwI59YDw75/m8qnLfrir5duPpPm3z/t00AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBBvx3+Lc0BJdEkAAAAAElFTkSuQmCC"
											alt="Preview Err"
										/>
									) : (
										<Avatar
											style={{
												borderRadius: '5%',
												width: '45px',
												height: '45px'
											}}
											alt="Remy Sharp"
											src={`${!order.photos[0] ? '' : order.photos[0]}`}
										/>
									)}
								</ListItemAvatar>
								<ListItemText
									primary={order.user.name ? order.user.name : ''}
									secondary={
										<React.Fragment>
											<Typography component="span" color="textPrimary">
												Telah menukarkan sampah sebanyak ...
											</Typography>
											<br />

											{order.status
												? order.status === 'SUCCESS'
													? 'Berhasil'
													: order.status === 'WAITING_CONFIRMATION'
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
				  ))
				: []}
		</div>
	);
};
export default OrderSummary;
