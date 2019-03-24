import styled from 'styled-components';
import buttons from '../../themes/buttons';


export default styled.button`
   color: #fff;
    border: 0;
    box-sizing: border-box;
    cursor: pointer;
    -webkit-appearance: button;
    border-radius: 3px;
    padding: 8px 15px;
    font-size: .8em;
    line-height: 1.1em;
    box-shadow: -1px 2px 5px 0px rgba(0,0,0,0.19);
    &[disabled] {
        opacity: .5;
        cursor: default;
    }
    ${buttons}
`;  
