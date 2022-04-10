import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        list-style: none;
        box-sizing: border-box;
    }
    body{
        background-color: #150270;
        font-size: 1.2rem;
        font-weight: 400;
        font-family: 'Lato', sans-serif
    }
    .Before{
        position: relative;
        padding-left: 3rem;
        &::before{
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            width: 35px;
            background-color: #395FF6;
            height:2px;
        }
    }
`;

export default GlobalStyle;