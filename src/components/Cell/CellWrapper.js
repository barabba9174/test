import styled from 'styled-components';
import cells from '../../themes/cells';


export default styled.button`
    color: #fff;
    border: 0;
    width: 49px;
    height: 49px;
    box-sizing: content-box;
    cursor: pointer;
    padding: 0;
    border-bottom: 1px solid #dcdcdc;
    border-right: 1px solid #dcdcdc;
    -webkit-appearance: button;
    touch-action: manipulation;
    &:focus {
        outline: none;
    }
    ${cells}
`;  
