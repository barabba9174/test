import styled from 'styled-components';
import cells from '../../themes/cells';


export default styled.button`
   color: #fff;
    border: 0;
    width: 49px;
    height: 49px;
    box-sizing: content-box;
    cursor: pointer;
    -webkit-appearance: button;
    padding: 0;
    &:focus {
        outline: none;
    }
    ${cells}
`;  
