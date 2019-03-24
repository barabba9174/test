import React, { PureComponent } from 'react';

import AppViewWrapper from './AppViewWrapper';
import Grid from '../../components/Grid';
import Form from '../../components/Form';

export default class AppView extends PureComponent {
    constructor() {
        super();
        this.state = {
            rows: 10,
            cols: 10,
            reload: true
        }
    }

    handleSubmit = (value) => {
        this.setState(value);
    }


    render() {
        const { rows, cols, reload } = this.state;


        return (
            <AppViewWrapper >
                <Form rows={rows} cols={cols} reload={reload} onSubmit={this.handleSubmit}></Form> 
                <Grid rows={rows} cols={cols} reload={reload}></Grid>
            </AppViewWrapper>
        );
    }
}
