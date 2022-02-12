/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import ApiBaseUrl from "api/ApiBaseUrl";
import { useMessage } from "hooks/useMessage";
import { useLoading } from "hooks/useLoading";
import { ResetPasswordProps } from "types/resetPasswordProps";

export const useResetPassword = () => {
    const { setLoading } = useLoading();
    const { showMessage } = useMessage();
    const history = useHistory();
    const [isResetPasswordState, setIsResetPasswordState] = useState(false);

    useEffect(() => {
        isResetPasswordState &&
        //setTimeout(() => {
            history.push('/sign_in');
        //}, 5 * 1000);
    }, [isResetPasswordState]);

    const resetPassword = useCallback((resetPasswordProps: ResetPasswordProps) => {
        setLoading(true);
        ApiBaseUrl
            .put<ResetPasswordProps>('/auth/password', resetPasswordProps)
            .then(result => {
                if(result.status===200) {
                    // console.log('resetPassword:', result.data.data);
                    showMessage({
                        message: "Reset Password Success!",
                        type: "success"
                    });

                    setIsResetPasswordState(true);
                }
            })
            .catch(() => {
                showMessage({
                    message: "Failed to put reset password data!",
                    type: "error"
                })
            })
            .finally(() => setLoading(false));
    }, []);

    return { resetPassword };
};