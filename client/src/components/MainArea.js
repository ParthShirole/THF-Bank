import React from "react";
import styled from 'styled-components';
import buisness from '../assets/marketing.mp4';
import circles from '../assets/circles.svg';
import {innerLayout} from "../styles/Layouts";
import Content from './Content';

const MainArea = () => {
    return ( 
        <MainAreaStyled>
            <video src={buisness} muted autoPlay playsInline loop></video>
            <img src={circles} alt="" className="overlay" />
            <innerLayout>
                <Content/>
            </innerLayout>
            
        </MainAreaStyled>
    );
}

const MainAreaStyled = styled.div`
    width: 100%;
    height: 85vh;
    position: relative;
    overflow: hidden;
    .overlay{
        width: 100%;
        height: 100%;
        position: absolute;
        right: -400px;
        top: -200px;
    }

    video{
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 1;
    }
`;

export default MainArea;