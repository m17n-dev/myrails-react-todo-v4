import { memo, useCallback, VFC } from "react";
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";

import { ResetPasswordForm } from "components/organisms/form/ResetPasswordForm";
import { DefaultLayout } from "components/templates/DefaultLayout";
import { useLoading } from "hooks/useLoading";
import Spinner from "components/atoms/spinner/Spinner";
import { useResetPassword } from "hooks/user/useResetPassword";
import { ResetPasswordProps } from "types/resetPasswordProps";

export const PageResetPassword: VFC = memo(() => {
    const { loading } = useLoading();
    const { resetPassword } = useResetPassword();
    
    const onClickResetPassword = useCallback((resetPasswordProps: ResetPasswordProps) => {
        resetPassword(resetPasswordProps);
    },[resetPassword]);

    return (
        <>
            {loading
                ? (<Spinner />)
                : (
                    <DefaultLayout>
                        <StyledContainer>
                            <ResetPasswordForm
                                onClick={onClickResetPassword} />
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