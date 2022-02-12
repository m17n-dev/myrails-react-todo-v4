import { memo, VFC } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

export const DefaultHeader:VFC = memo(() => {
    const location = useLocation();
    
    return(
        <StyledHeader>
            {(location.pathname === '/') &&
            <StyledDisableLink>TOP</StyledDisableLink>}
            {!(location.pathname === '/') &&
            <StyledLink to="/">TOP</StyledLink>}
            {(location.pathname === '/sign_up') &&
            <StyledDisableLink>SIGN UP</StyledDisableLink>}
            {!(location.pathname === '/sign_up') &&
            <StyledLink to="/sign_up">SIGN UP</StyledLink>}
            {(location.pathname === '/sign_in') &&
            <StyledDisableLink>SIGN IN</StyledDisableLink>}
            {!(location.pathname === '/sign_in') &&
            <StyledLink to="/sign_in">SIGN IN</StyledLink>}
        </StyledHeader>
    )
});

const StyledHeader = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #11999e;
    color: #fff;
    padding: 8px 0;
`
const StyledLink = styled(Link)`
    margin: 0 8px;
`
const StyledDisableLink = styled.div`
    margin: 0 8px;
`