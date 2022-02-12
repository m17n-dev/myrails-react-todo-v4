/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";

import ApiBaseUrl from "api/ApiBaseUrl";
import { useMessage } from "hooks/useMessage";
import { useLoading } from "hooks/useLoading";
import { EmailProps } from "types/emailProps";

export const useForgotPasswordConfirmation = () => {
    const { setLoading } = useLoading();
    const { showMessage } = useMessage();

    const forgotPasswordConfirmation = useCallback((emailProps: EmailProps) => {
        setLoading(true);
        ApiBaseUrl
            .post<EmailProps>('/auth/password', emailProps)
            .then(result => {
                if(result.status===200) {
                    showMessage({
                        message: "An email has been sent to '" + emailProps.email + "' containing instructions for resetting your password. Now, go check your email.",
                        type: "success"
                    });
                }
            })
            .catch(() => {
                showMessage({
                    message: "Could not send to the email address you entered",
                    type: "error"
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return { forgotPasswordConfirmation };
};
