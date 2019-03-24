import React, {Component} from 'react';
import { string, func } from 'prop-types';
import { checkValue, checkInRange} from '../../utils/formsErrors';

class Input extends Component {
    static defaultProps = {
        onSubmit: () => { },
        value: ''
    }

    static propTypes = {
        onSubmit: func,
        value: string,
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
            const {error, value} = this.state;
            if (!error) onSubmit({value, error})
        }
    }

    handleChange = (event) => {
        const regex = /^[lrf]{0,20}$/i;
        const {onSubmit} = this.props;
        const newState = checkValue(
            event.target.value,
            regex,
            (valueToCheck) => checkInRange(
                valueToCheck,
                20
            )
        )
        this.setState(newState, () => onSubmit(newState));
    }

    render() {
        const {value, id} = this.props;
        const {error} = this.state;
        return (
            <label
                htmlFor={id}
                className={`input${ error
                ? ' invalid'
                : ''}`}>
                Instructions
                <input
                    type="text"
                    id={id}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    defaultValue={value}/>
                <div className="error">{error}</div>
            </label>
        );
    }
}

export default Input;
