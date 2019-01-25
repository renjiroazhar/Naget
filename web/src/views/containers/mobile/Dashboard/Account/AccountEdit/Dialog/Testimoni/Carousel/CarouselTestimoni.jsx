import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Img from '../image/img/photo.jpg';
import Img1 from '../image/img/photo (1).jpg';
import Img2 from '../image/img/photo (2).jpg';
import Img3 from '../image/img/photo (3).jpg';
import Img4 from '../image/img/photo (4).jpg';
import Img5 from '../image/img/photo (5).jpg';
import Img6 from '../image/img/photo (6).jpg';
import Img7 from '../image/img/photo (7).jpg';
import Img8 from '../image/img/photo (8).jpg';
import Img9 from '../image/img/photo (9).jpg';
import Img10 from '../image/img/photo (10).jpg';
import Img11 from '../image/img/photo (11).jpg';
import Img12 from '../image/img/photo (12).jpg';
import Img13 from '../image/img/photo (13).jpg';
import Img14 from '../image/img/photo (14).jpg';
import Img15 from '../image/img/photo (15).jpg';
import Img16 from '../image/img/photo (16).jpg';
import Img17 from '../image/img/photo (17).jpg';
import Img18 from '../image/img/photo (18).jpg';
import Img19 from '../image/img/photo (19).jpg';
import Img20 from '../image/img/photo (20).jpg';
import Img21 from '../image/img/photo (21).jpg';
import Img22 from '../image/img/photo (22).jpg';
import Img23 from '../image/img/photo (23).jpg';
import Img24 from '../image/img/photo (24).jpg';
import Img25 from '../image/img/photo (25).jpg';
import Img26 from '../image/img/photo (26).jpg';
import Img27 from '../image/img/photo (27).jpg';
import Img28 from '../image/img/photo (28).jpg';
import Img29 from '../image/img/photo (29).jpg';
import Img30 from '../image/img/photo (30).jpg';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import './style/style.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
	{
		label:
			'Awesome! Sampahnya dijemput, pickernya ramah, dapet uang lagi hehe. Sangat memudahkan bagi kami para mahasiswa yang di kos banyak tumpukan sampah. Save the earth by keeping it clean.',
		imgPath: `${Img}`,
		name: 'Dian Istiqomah'
	},
	{
		label:
			'Keren. Bisa nih jadi solusi untuk yg punya barang2 bekas selain bisa buat rumah makin bersih juga dapat uang lho Sip, makasih atas jasanya 😄😄😄😄.',
		imgPath: `${Img1}`,
		name: 'Arie Widya'
	},
	{
		label:
			'Akhirnyaaa nemu jasa buat menghibahkan kertas kertas yang numpuk di kosan, asli berguna sangat. Tengkyu yaaaa❣️.',
		imgPath: `${Img2}`,
		name: 'Hala Saadiyya'
	},
	{
		label:
			'Gerakan yang bagus untuk menyadarkan kita bahwa biar sampah sekalipun tetap bisa menghasilkan manfaat (uang) dan ga cuma numpuk jadi debu dikosan/rumah. Mulai perduli dengan lingkungan dari hal-hal kecil kaya gini👍.',
		imgPath: `${Img3}`,
		name: 'Afina Aini'
	},
	{
		label:
			'Sangat Membantu dan bermanfaat banget buat mahasiswa... pelayananannya gercep dan gapake ribet.. mantap deh pokoknya 👍 Semoga sukses.',
		imgPath: `${Img4}`,
		name: 'afifah farhah'
	},
	{
		label:
			'Sangat kreatif, dan bermanfaat. Pelayanan cepat dan ramah dengan harga yang terjangkau. Menyadarkan saya bahwa menjaga lingkungan dapat mendatangkan banyak keuntungan bagi saya secara nyata.',
		imgPath: `${Img5}`,
		name: 'Theo Dora Sinta Arum Jati'
	},
	{
		label:
			'Keren banget, solusi buat yg punya barang barang bekas selain bisa buat rumah makin bersih juga dapat uang lho.',
		imgPath: `${Img6}`,
		name: 'Faizah Dila'
	},
	{
		label:
			'Pelayanan baik dan ramah. Cocok buat yang bingung mau buang kertas bekas kemana. Lumayan, sekalian bersih-bersih kamar.',
		imgPath: `${Img7}`,
		name: 'Aditia Prasetio'
	},
	{
		label:
			'Fast respon, ramaaah banget walaupun aku ganti jadwal :) pas ketemu kurirnya juga ramah, terbaiq!',
		imgPath: `${Img8}`,
		name: 'Khansa Ramadianti'
	},
	{
		label:
			'Mantapp nih aplikasi. Udah ga pusing mau di kemanain sampah2 kertas di kosan. 👍👍.',
		imgPath: `${Img9}`,
		name: 'Deswulan 96'
	},
	{
		label:
			'Sampah2 kertas jadi ga numpuk lagi di kosan, makasih banyak moretrash semoga lancar terus!!',
		imgPath: `${Img10}`,
		name: 'Windy Isnin Sitta S.'
	},
	{
		label:
			'Mantaaap, mengurangi sampah kertas di kosan.. semoga bisa bermanfaat 😁.',
		imgPath: `${Img11}`,
		name: 'Tiara S'
	},
	{
		label:
			'Sangat membantu dan menyenangkan, tidak perlu repot-repot ke pengepul tapi tetap dapat untung hehe.',
		imgPath: `${Img12}`,
		name: 'Akhbarani Rani'
	},
	{
		label: 'mantap coy, cepet prosesnya. sukses teruss🙏 .',
		imgPath: `${Img13}`,
		name: 'annisa lufth'
	},
	{
		label: 'Seneng banget bisa buang sisa kertas laporan dengan mudah.',
		imgPath: `${Img14}`,
		name: 'Chintya ramadhani'
	},
	{
		label: 'cara tepat mengelola sampah #2019semarangbebassampah.',
		imgPath: `${Img15}`,
		name: 'aulia nisrina'
	},
	{
		label: 'sangat membantu.',
		imgPath: `${Img16}`,
		name: 'Chairinnisa Alicia'
	},
	{
		label: 'Dapet duit dari rosokin sampah 👍.',
		imgPath: `${Img17}`,
		name: 'Devid Adi Surya'
	},
	{
		label: 'Solusi cepat dan tepat untuk yang punya sampah kertas.',
		imgPath: `${Img18}`,
		name: 'ESTIE YONASARI'
	},
	{
		label:
			'Simple banget sih cara ordernya, and fast respon yang bikin seneng,,',
		imgPath: `${Img19}`,
		name: 'Ayu Silvia'
	},
	{
		label:
			'sampah tidak untuk dikoleksi, ini solusi nya #2019semarangbebassampah.',
		imgPath: `${Img20}`,
		name: 'Maulidia putri p'
	},
	{
		label: 'Bermanfaat.',
		imgPath: `${Img21}`,
		name: 'Novia Dwinisrina'
	},
	{
		label: 'mantap.',
		imgPath: `${Img22}`,
		name: 'Kemal Ahmad'
	},
	{
		label: 'Mantap.',
		imgPath: `${Img23}`,
		name: 'Ari wibowo'
	},
	{
		label:
			'Great! Sampahnya dijemput, pickernya ramah, dapet uang lagi hehe. Sangat memudahkan bagi kami para mahasiswa yang di kos banyak tumpukan sampah. Save the earth by keeping it clean.',
		imgPath: `${Img24}`,
		name: 'Dian Istiqomah'
	},
	{
		label: 'Miminya ramah dan drivernya juga.',
		imgPath: `${Img25}`,
		name: 'fitria qotrotun nada'
	},
	{
		label:
			'This is a good movement to reduce student waste. Contact the id, choose to picked up the trash by them or put it yourself, and finish. We will get money from it and protect the environment at the same time. The picker is nice and friendly. It also has a good track record. Sukses terus untuk Moretrash Indonesia .',
		imgPath: `${Img26}`,
		name: 'debianandya seiva'
	},
	{
		label: "It's a new and fun way to throw away our trash..",
		imgPath: `${Img27}`,
		name: 'Priskila Mellyn'
	},
	{
		label: 'Nice place, good movement from the young.',
		imgPath: `${Img28}`,
		name: 'Akbar Hars'
	},
	{
		label: 'good more bike.id.',
		imgPath: `${Img29}`,
		name: 'Dwi Rahayu Prihandini'
	},
	{
		label: 'Good.',
		imgPath: `${Img30}`,
		name: 'Ridwan Santosa'
	}
];

const styles = theme => ({
	root: {
		width: '100%',
		flexGrow: 1
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		height: 50,
		justifyContent: 'center',
		backgroundColor: theme.palette.background.default,
		marginTop: '20px',
		fontStyle: 'italic',
		color: '#757575',
		padding: '17px',
		textAlign: 'center'
	},
	name: {
		display: 'flex',
		alignItems: 'center',
		height: 50,
		justifyContent: 'center',
		paddingLeft: 0,
		backgroundColor: theme.palette.background.default,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	img: {
		height: 40,
		display: 'block',
		overflow: 'hidden',
		width: 40,
		marginTop: '50px'
	},
	mobileStepper: {
		color: '#fecb00ff'
	},
	/* Styles applied to a dot if `variant="dots"` and this is the active step. */
	dot: {
		backgroundColor: 'red',
		borderRadius: '50%',
		width: 8,
		height: 8,
		margin: '0 2px'
	},
	/* Styles applied to a dot if `variant="dots"` and this is the active step. */
	dotActive: {
		backgroundColor: 'red'
	}
});

class CarouselTestimoni extends React.Component {
	state = {
		activeStep: 0
	};

	handleNext = () => {
		this.setState(prevState => ({
			activeStep: prevState.activeStep + 1
		}));
	};

	handleBack = () => {
		this.setState(prevState => ({
			activeStep: prevState.activeStep - 1
		}));
	};

	handleStepChange = activeStep => {
		this.setState({ activeStep });
	};

	render() {
		const { classes, theme } = this.props;
		const { activeStep } = this.state;

		return (
			<div className={classes.root}>
				<AutoPlaySwipeableViews
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={activeStep}
					onChangeIndex={this.handleStepChange}
					enableMouseEvents
				>
					{tutorialSteps.map((step, index) => (
						<div key={step.label}>
							{Math.abs(activeStep - index) <= 2 ? (
								<div>
									<Paper square elevation={0} className={classes.header}>
										<Typography
											style={{
												textAlign: 'center',
												justifyContent: 'center'
											}}
										>
											{tutorialSteps[activeStep].label}
										</Typography>
									</Paper>

									<center>
										<img className={classes.img} src={step.imgPath} alt="" />
									</center>

									<Paper square elevation={0} className={classes.name}>
										<Typography style={{ fontWeight: 'bold' }}>
											{`${tutorialSteps[activeStep].name}`}
										</Typography>
									</Paper>
								</div>
							) : null}
						</div>
					))}
				</AutoPlaySwipeableViews>
			</div>
		);
	}
}

CarouselTestimoni.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(CarouselTestimoni);
