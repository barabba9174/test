import styled from 'styled-components';


export default styled.div`
    text-align: left;
    margin: 0 auto;
    padding: 40px 20px;
    width: 335px;

    @media only screen and (min-width: 768px) {
        padding: 50px;
        width: 500px;
    }

`;  

export const SyledLogo = styled.img`
    width: 50%;
    margin-bottom: 34px;

`

export const TitleStyled = styled.h1`
    position: absolute;
    left: -1000000px;
`