/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { AxiosResponse } from "axios";

import ApiBaseUrl from "api/ApiBaseUrl";
import { useMessage } from "hooks/useMessage";
import { useAuth } from "hooks/user/useAuth";
import { useLoading } from "hooks/useLoading";
import { SignUpProps } from "types/signUpProps";
import { User } from "types/api/user";

type ApiData = {
    data: User;
};

export const useSignUp = () => {
    const { setIsAuthenticated, setAuthenticatedUser } = useAuth();
    const { setLoading } = useLoading();
    const { showMessage } = useMessage();

    const signUp = useCallback((signUpProps: SignUpProps) => {
        setLoading(true);
        ApiBaseUrl
            .post<SignUpProps, AxiosResponse<ApiData>>('/auth', signUpProps)
            .then(result => {
                if(result.status===200) {
                    setIsAuthenticated(true);
                    setAuthenticatedUser(result.data.data);

                    showMessage({
                        message: "Sign Up Success!",
                        type: "success"
                    });
                }
            })
            .catch(() => {
                setIsAuthenticated(false);
                showMessage({
                    message: "Failed to post sign up data!",
                    type: "error"
                })
            })
            .finally(() => setLoading(false));
    }, []);
    
    return { signUp };
};