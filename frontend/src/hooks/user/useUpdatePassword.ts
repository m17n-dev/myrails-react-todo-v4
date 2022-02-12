/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";

import ApiBaseUrl from "api/ApiBaseUrl";
import { useMessage } from "hooks/useMessage";
import { useLoading } from "hooks/useLoading";
import { UpdatePasswordProps } from "types/updatePasswordProps";
import { AuthTokenHeaderProps } from "types/authTokenHeaderProps";

type Props = {
    updatePasswordProps: UpdatePasswordProps;
    authTokenHeaderProps: AuthTokenHeaderProps;
};

export const useUpdatePassword = () => {
    const { setLoading } = useLoading();
    const { showMessage } = useMessage();

    const updatePassword = useCallback((props: Props) => {
        const { updatePasswordProps, authTokenHeaderProps } = props;
        setLoading(true);
        ApiBaseUrl
            .put<UpdatePasswordProps>('/auth', updatePasswordProps, { headers: authTokenHeaderProps })
            .then(result => {
                if(result.status===200) {
                    showMessage({
                        message: "Update Password Success!",
                        type: "success"
                    });
                }
            })
            .catch(() => {
                showMessage({
                    message: "Failed to put update password data!",
                    type: "error"
                })
            })
            .finally(() => setLoading(false));
    }, []);

    return { updatePassword };
};