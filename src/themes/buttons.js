import theme from 'styled-theming';
import { css } from 'styled-components';

export default theme('button', {

    default: css`
        background: #4a90e2;

        &:hover {
            background-color: #76b5ff;
        }
        &:active {
            background-color: #235896;
        }
  `,

})