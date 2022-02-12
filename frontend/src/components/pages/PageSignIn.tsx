/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, VFC } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";

import { useSignIn } from "hooks/user/useSignIn";
import { useLoading } from "hooks/useLoading";
import Spinner from "components/atoms/spinner/Spinner";
import { SignInForm } from "components/organisms/form/SignInForm";
import { DefaultLayout } from "components/templates/DefaultLayout";
import { SignInProps } from "types/signInProps";

export const PageSignIn: VFC = memo(() => {
    const { loading } = useLoading();
    const { signIn } = useSignIn();

    const onClickSignIn = useCallback((signInProps: SignInProps) => {
        signIn(signInProps);
    },[]);
    
    return (
        <>
            <ToastContainer />
            {loading
                ? (<Spinner />)
                : (
                    <DefaultLayout>
                        <StyledContainer>
                            <SignInForm
                                onClick={onClickSignIn} />
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