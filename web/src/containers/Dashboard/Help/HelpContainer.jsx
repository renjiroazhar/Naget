import React, { Component } from 'react'
import Navbar from '../../../components/Navbar';
import { Accordion } from 'antd-mobile';
import Help from './svg/Help.svg';

const myAccordion = {
    padding: "15px",
};

export default class HelpContainer extends Component {
    onChange = (key) => {
        console.log(key);
    }
    render() {
        return (
            <div>
                <Navbar style={{ position: 'content' }} />

                <div style={{ width: "90px", height: "90px", }} >
                    <center>
                        <Help />
                    </center>
                </div>

                <div style={{ marginTop: "10px", }} >
                    <Accordion defaultActiveKey="0" className={myAccordion} onChange={this.onChange}>
                        <Accordion.Panel header="Apa Moretrash itu?" className={myAccordion}>
                            text text text text text text text text text text text text text text text
                        </Accordion.Panel>
                        <Accordion.Panel header="Bagaimana kerja Moretrash itu?" className={myAccordion}>
                            text text text text text text text text text text text text text text text
                        </Accordion.Panel>
                    </Accordion>
                </div>
            </div>
        )
    }
}