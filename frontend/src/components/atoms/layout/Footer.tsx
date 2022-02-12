import { memo, VFC } from "react";
import styled from "styled-components";

export const Footer:VFC = memo(() => {
    return(
        <StyledFooter>
            &copy; 2021 m17n.dev
        </StyledFooter>
    )
});

const StyledFooter = styled.footer`
    background-color: #11999e;
    color: #fff;
    text-align: center;
    padding: 8px 0;
    position: fixed;
    bottom: 0;
    width: 100%;
`