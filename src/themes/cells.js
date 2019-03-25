import theme from 'styled-theming';
import {css} from 'styled-components';

export default theme('cell', {

    default: css `
        background: #f1f1f1;
        cursor: pointer;
        &:hover {
            background-color: #f8f8f8;
            outline: none;
        }
        &:active {
            background-color: #e2e2e2;
        }
  `,
    clear: css `
        background: #fff;
        cursor: pointer;
        &:hover {
            background-color: #f8f8f8;
            outline: none;
        }
        &:active {
            background-color: #e2e2e2;
        }
    `,
    start: css `
        background: #7ed321;
 border: 0;
        box-sizing: content-box;
        -webkit-appearance: button;
        cursor: default;
    `,
    end: css `
        background: #639530;
    `,
    path: css `
        background: #f5a623;
        cursor: pointer;
    `
})