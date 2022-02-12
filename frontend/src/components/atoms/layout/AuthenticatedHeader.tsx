import { memo, VFC } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { AuthTokenHeaderProps } from "types/authTokenHeaderProps";
import { SignOutButton } from "components/atoms/button/SignOutButton";
import { useAuth } from "hooks/user/useAuth";

type Props = {
    onClick: (authTokenHeaderProps: AuthTokenHeaderProps) => void;
}

export const AuthenticatedHeader:VFC<Props> = memo((props) => {
    const { onClick } = props;
    
    const { formState } = useForm();
    const { isSubmitting } = formState;
    const location = useLocation();
    const { authTokens } = useAuth();
    
    return(
        <StyledHeader>
            {(location.pathname === '/todo') &&
            <StyledDisableLink>TODO</StyledDisableLink>}
            {!(location.pathname === '/todo') &&
            <StyledLink to="/todo">TODO</StyledLink>}
            {(location.pathname === '/user/settings') &&
            <StyledDisableLink>SETTINGS</StyledDisableLink>}
            {!(location.pathname === '/user/settings') &&
            <StyledLink to="/user/settings">SETTINGS</StyledLink>}
            <StyledButtonWrapper>
                <SignOutButton
                    disabled={isSubmitting}
                    onClick={() =>onClick(authTokens!)}
                >
                    SIGN OUT
                </SignOutButton>
            </StyledButtonWrapper>
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
const StyledButtonWrapper = styled.div`
    margin: 0px 10px;
`