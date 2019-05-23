import React, { Component } from 'react';
import Coming_Soon from '../../../../assets/img/png/coming_soon.png';

export default class ComingSoon extends Component {
    render() {
        return (
            <div>
                <img
                    src={Coming_Soon}
                    srcSet={Coming_Soon}
                    alt="Coming Soon"
                    retina_logo_url=""
                    style={{
                        width: '100%',
                        height: '100vh',
                        margin: 0,
                        backgroundSize: 'cover',
                    }}
                />
            </div>
        )
    }
}
