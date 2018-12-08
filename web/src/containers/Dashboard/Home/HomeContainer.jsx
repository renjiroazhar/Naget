import React, { Component } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import Navbar from '../../../components/Navbar';
import CardPicture from './Card/CardPicture';
import CarouselPicture from './Carousel/CarouselPicture';

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
				<div>
					<CardPicture />
				</div>
				<div>
					<CarouselPicture />
				</div>
				<center>
					<div style={{ width: '90%', textAlign: 'center', marginTop: '50px' }}>
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
						<WhiteSpace />
					</div>
				</center>
			</div>
		);
	}
}

export default HomeContainer;
