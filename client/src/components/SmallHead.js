import React from "react";
import styled from "styled-components";

function SmallHead({title, identifier}){
    return (
        <SmallHeadStyled>
            <h3 className={identifier}>
                {title}
            </h3>
        </SmallHeadStyled>
    );
}

const SmallHeadStyled = styled.div`
    h3{
        background: linear-gradient(120deg, rgb(132, 111, 244), rgb(241, 118, 116));
        background-clip: text;
        display: inline-block;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
    }
`;

export default SmallHead;