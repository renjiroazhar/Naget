import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/style.css';

export default class NotFound extends Component {
	render() {
		return (
			<div>
				<div id="notfound">
					<div className="notfound">
						<div className="notfound-404">
							<h1>
								4<span />4
							</h1>
						</div>
						<h2>Oops! Page Not Be Found</h2>
						<p>
							Sorry but the page you are looking for does not exist, have been
							removed. name changed or is temporarily unavailable
						</p>

						<Link to="/">
							<a href="/">Back to homepage</a>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
