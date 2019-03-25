import styled from 'styled-components';



export default styled.div`
  width: auto;
  display: flex;
  min-width: 490px;
  flex-wrap: wrap;
  background-color: #dcdcdc;
  border: 1px solid #dcdcdc;
  border-right: 0;
  border-bottom: 0;


  & button {
    height: ${props => `${((499 - props.colsNumber) / props.colsNumber)}px`};
    width: ${props => `calc(100% * ${(1 / props.colsNumber)} - 1px)`};
  }

`;  


export const AriaResult = styled.div`
  position: absolute;
  left: -100000px;
`