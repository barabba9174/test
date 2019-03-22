import theme from 'styled-theming';
import { css } from 'styled-components';

export default theme('cell', {

    default: css`
        background: #f1f1f1;
        border: 0;
        box-sizing: content-box;
        cursor: pointer;
        -webkit-appearance: button;
        &:hover {
            background-color: #f8f8f8;
            outline: none;
        }
       
        &:active {
            background-color: #e2e2e2;
        }
  `,
    clear: css`
        background: #fff;
        border: 0;
        box-sizing: content-box;
        cursor: pointer;
        -webkit-appearance: button;

    `,
    start: css`
        background: #7ed321;
        border: 0;
        box-sizing: content-box;
        -webkit-appearance: button;
    `,
    end: css`
        background: #639530;
        border: 0;
        box-sizing: content-box;
        -webkit-appearance: button;
    `,
    path: css`
        background: #f5a623;
        border: 0;
        box-sizing: content-box;
        -webkit-appearance: button;
    `,

})