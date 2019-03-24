import React, {Component} from 'react';
import {func, number, bool} from 'prop-types';

import FromWrapper, {InputWrapper, SpanWrapper, ButtonWrapper} from './FormWrapper';
import Input from '../Input';
import Button from '../Button';

export default class Form extends Component {

    static defaultProps = {
        onSubmit: () => {},
        rows: 10,
        cols: 10,
        reload: false
    }

    static propTypes = {
        onSubmit: func,
        rows: number,
        cols: number,
        reload: bool
    }

    constructor({rows, cols}) {
        super();
        this.state = {
            rows: {
                value: rows
            },
            cols: {
                value: cols
            }
        };
    }

    handleSubmit = (value) => {
        this.setState(value);
    }

    render() {
        const {onSubmit, reload} = this.props;
        const {rows, cols} = this.state;

        return (
            <FromWrapper>

                <InputWrapper>
                    <Input
                        label="Rows"
                        id="rows"
                        onSubmit={(value) => this.handleSubmit({rows: value})}
                        value={rows.value}/>
                    <SpanWrapper>x</SpanWrapper>
                    <Input
                        label="Columns"
                        id="cols"
                        value={cols.value}
                        onSubmit={(value) => this.handleSubmit({cols: value})}/>
                </InputWrapper>
                <ButtonWrapper>
                    <Button
                        disabled={!!(cols.error || rows.error)}
                        onClick={() => onSubmit({
                        cols: Number(cols.value),
                        rows: Number(rows.value),
                        reload: !reload
                    })}>Generate</Button>
                </ButtonWrapper>
            </FromWrapper>
        );
    }
}
