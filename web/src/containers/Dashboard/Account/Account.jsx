import React from 'react';
import { Page, Toolbar } from 'react-onsenui';
import TooltipButton from '../../../components/TooltipButton';
import EditProfil from './AccountEdit/Dialog/EditProfil';
import GantiPassword from './AccountEdit/Dialog/GantiPassword';
import Divider from '@material-ui/core/Divider';
import Logout from './AccountEdit/Dialog/Logout';
import Faq from './AccountEdit/Dialog/Faq';
import Rate from './AccountEdit/Dialog/Rate';
import Tentang from './AccountEdit/Dialog/Tentang';
import Testimoni from './AccountEdit/Dialog/Testimoni';

export default class Account extends React.Component {
	renderTab() {
		this.props.renderTab();
	}
	render() {
		return (
			<Page
				renderToolbar={() => (
					<Toolbar
						transparent
						noshadow
						style={{ height: '56px', backgroundColor: '#333c4e' }}
					>
						{/* <div className="left">
					<BackButton>Back</BackButton>
				</div> */}
						<div
							className="center"
							style={{
								lineHeight: '56px',
								display: 'block',
								textAlign: 'center',
								marign: 'auto'
							}}
						>
							<img
								src="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png"
								srcset="https://www.moretrash.id/wp-content/uploads/2018/05/logo-moretrash.png 1x"
								width="120px"
								height="35px"
								alt="Moretrash Logo"
								retina_logo_url=""
								class="fusion-standard-logo"
							/>
						</div>
						{/* <div className="right">
					<ToolbarButton>
						<Icon icon="md-menu" />
					</ToolbarButton>
				</div> */}
					</Toolbar>
				)}
				renderFixed={() => <TooltipButton />}
			>
				<div style={{ marginTop: '10px' }}>
					<EditProfil />
				</div>
				<Divider />
				<div>
					<GantiPassword />
				</div>

				<div>
					<Rate />
				</div>
				<div>
					<Testimoni />
				</div>
				<div>
					<Faq renderTab={() => this.props.renderTab()} />
				</div>
				<div>
					<Tentang />
				</div>

				<div>
					<Logout />
				</div>
				{/*Tooltip*/}
				<br />
				<br />
				<br />
			</Page>
		);
	}
}
