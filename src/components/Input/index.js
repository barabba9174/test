import React, {Component} from 'react';
import { string, func, oneOfType, number } from 'prop-types';
import checkValue from './utils';
import InputWrapper from './InputWrapper';

export default class Input extends Component {
    static defaultProps = {
        onSubmit: () => { },
        value: '',
        id: 'idField',
        label: ''
    }

    static propTypes = {
        onSubmit: func,
        value: oneOfType([string, number]),
        id: string,
        label: string
    }

    constructor({value}) {
        super();
        this.state = {
            value,
            error: false
        };
    }

    handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            const {onSubmit} = this.props;
            const { error, value } = this.state; if (!error)
                onSubmit({ value, error })
        }
    }

    handleChange = (event) => {
        const regex = /^[0-9]{1,2}$/i;
        const { onSubmit } = this.props;

        const newState = checkValue(event.target.value, regex)
        this.setState(newState, () => onSubmit(newState));
    }

    render() {
        const { value, id, label } = this.props;
        const { error } = this.state;
        const errorId = `error${id}`;
        return (
            <InputWrapper htmlFor={id} error={error} // eslint-disable-next-line no-extra-boolean-cast
                className={`${!!error
                    ? ' invalid'
                    : ''}`}>
                {label}
                <input
                    type="text"
                    id={id}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    aria-describedby={errorId}
                    defaultValue={value}/>
                <div className="error" id={errorId}>{error}</div>
            </InputWrapper>
        );
    }
}
