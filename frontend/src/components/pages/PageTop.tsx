import { memo, VFC } from "react";
import styled from "styled-components";

import { useAuth } from "hooks/user/useAuth";
import { useLoading } from "hooks/useLoading";
import Spinner from "components/atoms/spinner/Spinner";
import { DefaultLayout } from "components/templates/DefaultLayout";

export const PageTop: VFC = memo(() => {
    const { isAuthenticated, authenticatedUser } = useAuth();
    const { loading } = useLoading();

    return (
        <>
            {loading
                ? (<Spinner />)
                : (
                    <DefaultLayout>
                        <StyledContainer>
                            <p>Top Page</p>
                            {isAuthenticated && (<p>Welcome! <b>{authenticatedUser?.name}</b> {authenticatedUser?.email}.</p>)}
                            {!isAuthenticated && (<p>Welcome! guest.</p>)}
                        </StyledContainer>
                    </DefaultLayout>
                  )
            }
        </>
    )
});

const StyledContainer = styled.div`
    padding: 24px;
`