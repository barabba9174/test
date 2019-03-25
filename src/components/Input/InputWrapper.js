import styled from 'styled-components';



export default styled.label`
    position: relative;
    text-align: left;
    font-size: .7em;
    display: block;
    
    & input {
        margin-top: .3em;
        border-radius: 5px;
        display: block;
        border: 1px solid #dcdcdc;
        padding: 7px 15px;
        width: 4.3em;
        font-size: 1.1em;
        box-sizing: border-box;
        text-align: center;
        box-shadow: -1px 2px 5px 0px rgba(0,0,0,0.05);
        touch-action: manipulation;
    }

    &.invalid input {
        border-color: #ff0000;
        outline-color: #ff0000;
        &:focus + .error {
            opacity: 1;
        }
    }

    &.invalid:hover .error {
        opacity: 1;
    }

    & .error {
        position: absolute;
        transition: opacity 200ms;
        left: 0;
        top: 100%;
        min-width: 100%;
        background: rgba(255,0,0,0.7);
        text-align: center;
        color: #fff;
        padding:4px 10px;
        font-size: 12px;
        white-space: nowrap;
        border-radius: 5px;
        pointer-events: none;
        margin-top: .4em;
        opacity: 0;

        &:before {
            content: "";
            position: absolute;
            top:-4px;
            left:22px;
            transform: rotate(180deg);
            border-width: 4px 6px 0 6px;
            border-style: solid;
            border-color: rgba(255,0,0,0.7) transparent transparent     transparent;
            z-index: 100;
        }
        

    }
  
`;  
