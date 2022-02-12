/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { AxiosResponse } from "axios";

import ApiBaseUrl from "api/ApiBaseUrl";
import { useMessage } from "hooks/useMessage";
import { useLoading } from "hooks/useLoading";
import { AuthTokenHeaderProps } from "types/authTokenHeaderProps";
import { User } from "types/api/user";
import { useForm } from "react-hook-form";
import { useAuth } from "hooks/user/useAuth";

type ApiData = {
    data: User;
};

type Props = {
    user: User;
    authTokenHeaderProps: AuthTokenHeaderProps;
};

export const useUpdateProfile = () => {
    const { setAuthenticatedUser } = useAuth();
    const { setLoading } = useLoading();
    const { showMessage } = useMessage();
    const { reset } = useForm<User>();

    const updateProfile = useCallback((props: Props) => {
        const { user, authTokenHeaderProps } = props;
        
        setLoading(true);

        ApiBaseUrl
            .put<User, AxiosResponse<ApiData>>('/auth', user, { headers: authTokenHeaderProps })
            .then(result => {
                if(result.status===200) {
                    setAuthenticatedUser(result.data.data);
                    reset(result.data.data);
                    showMessage({
                        message: "Update User Success!",
                        type: "success"
                    });
                }
            })
            .catch(() => {
                showMessage({
                    message: "Failed to put update user data!",
                    type: "error"
                })
            })
            .finally(() => setLoading(false));
    }, []);

    return { updateProfile };
};