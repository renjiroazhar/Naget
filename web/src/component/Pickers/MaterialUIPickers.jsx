import React, { PureComponent } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { Icon, IconButton, Menu, MenuItem } from '@material-ui/core';
import {
	DatePicker,
	MuiPickersUtilsProvider,
	TimePicker
} from 'material-ui-pickers';

import idLocale from 'date-fns/locale/id';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';
import { format } from 'date-fns/esm';
const localeMap = {
	en: enLocale,
	id: idLocale,
	ru: ruLocale
};

export default class DateFnsLocalizationExample extends PureComponent {
	state = {
		selectedDate: new Date(),
		anchorEl: null,
		currentLocale: 'id',
		time: new Date()
	};

	handleDateChange = date => {
		this.setState({ selectedDate: date });
		console.log(format(this.state.selectedDate, 'dd/MM/yyyy'));
	};

	handleMenuOpen = event => {
		event.stopPropagation();
		this.setState({ anchorEl: event.currentTarget });
		console.log(format(this.state.selectedDate, 'dd/MM/yyyy'));
	};

	handleMenuClose = () => {
		this.setState({ anchorEl: null });
	};

	handleTimeChange = date => {
		this.setState({ time: date });
		console.log(format(this.state.time, 'HH:mm'));
	};

	selectLocale = selectedLocale => {
		this.setState({
			currentLocale: selectedLocale,
			anchorEl: null
		});
	};

	render() {
		const { selectedDate, time } = this.state;
		const locale = idLocale;

		return (
			<MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
				<div className="picker">
					<TimePicker value={time} onChange={this.handleTimeChange} />
					<DatePicker
						value={selectedDate}
						onChange={this.handleDateChange}
						InputProps={{
							endAdornment: (
								<IconButton
									aria-label="Select locale"
									aria-owns={this.state.anchorEl ? 'locale-menu' : null}
									onClick={this.handleMenuOpen}
								>
									<Icon> more_vert </Icon>
								</IconButton>
							)
						}}
					/>
				</div>

				<Menu
					id="locale-menu"
					anchorEl={this.state.anchorEl}
					open={Boolean(this.state.anchorEl)}
					onClose={this.handleMenuClose}
				>
					{Object.keys(localeMap).map(localeItem => (
						<MenuItem
							key={localeItem}
							selected={localeItem === this.state.locale}
							onClick={() => this.selectLocale(localeItem)}
						>
							{localeItem}
						</MenuItem>
					))}
				</Menu>
			</MuiPickersUtilsProvider>
		);
	}
}
