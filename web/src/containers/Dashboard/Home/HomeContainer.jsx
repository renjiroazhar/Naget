import React, { Component } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import Navbar from '../../../components/Navbar';
import CardPicture from './Card/CardPicture';
import CarouselPicture from './Carousel/CarouselPicture';
import { Link } from 'react-router-dom';

class HomeContainer extends Component {
	render() {
		return (
			<div
				style={{
					backgroundColor: '#e7e7e7',
					height: '100%',
					minHeight: '100vh'
				}}
			>
				<Navbar style={{ position: 'content' }} />
				<br />
				<br />
				<br />
				<div>
					<CardPicture />
				</div>
				<div style={{ textAlign: 'center' }}>
					<center>
						<CarouselPicture />
					</center>
				</div>
				<center>
					<div style={{ width: '90%', textAlign: 'center', marginTop: '50px' }}>
						<Link to="/form_login">
							<Button
								style={{
									borderRadius: 0,
									backgroundColor: '#1abc9c',
									color: 'white'
								}}
								type="default"
							>
								PICK TRASH
							</Button>
						</Link>
						<WhiteSpace />
					</div>
				</center>
				<br />
				<br />
			</div>
		);
	}
}

export default HomeContainer;
