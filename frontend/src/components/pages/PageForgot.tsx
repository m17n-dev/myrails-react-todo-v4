/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, VFC } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";

import { useForgotPasswordConfirmation } from "hooks/user/useForgotPasswordConfirmation";
import { useLoading } from "hooks/useLoading";
import { EmailProps } from "types/emailProps";
import Spinner from "components/atoms/spinner/Spinner";
import { ForgotForm } from "components/organisms/form/ForgotForm";
import { DefaultLayout } from "components/templates/DefaultLayout";

export const PageForgot: VFC = memo(() => {
    const { loading } = useLoading();
    const { forgotPasswordConfirmation } = useForgotPasswordConfirmation();
    
    const onClickForgot = useCallback((emailProps: EmailProps) => {
        forgotPasswordConfirmation(emailProps);
    },[forgotPasswordConfirmation]);

    return (
        <>
            <ToastContainer />
            {loading
                ? (<Spinner />)
                : (
                    <DefaultLayout>
                        <StyledContainer>
                            <ForgotForm
                                onClick={onClickForgot} />
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