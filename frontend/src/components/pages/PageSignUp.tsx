import { memo, useCallback, VFC } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";

import { SignUpForm } from "components/organisms/form/SignUpForm";
import { DefaultLayout } from "components/templates/DefaultLayout";
import { useSignUp } from "hooks/user/useSignUp";
import { useLoading } from "hooks/useLoading";
import { SignUpProps } from "types/signUpProps";
import Spinner from "components/atoms/spinner/Spinner";

export const PageSignUp: VFC = memo(() => {
    const { loading } = useLoading();
    const { signUp } = useSignUp();

    const onClickSignUp = useCallback((signUpProps: SignUpProps) => {
        signUp(signUpProps);
    },[signUp]);

    return (
        <>
            <ToastContainer />
            {loading
                ? (<Spinner />)
                : (
                    <DefaultLayout>
                        <StyledContainer>
                            <SignUpForm
                                onClick={onClickSignUp} />
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