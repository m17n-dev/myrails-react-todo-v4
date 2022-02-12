/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

import ApiBaseUrl from "api/ApiBaseUrl";
import { useMessage } from "hooks/useMessage";
import { useAuth } from "hooks/user/useAuth";
import { useLoading } from "hooks/useLoading";
import { SignInProps } from "types/signInProps";
import { User } from "types/api/user";

type ApiData = {
    data: User;
};

export const useSignIn = () => {
    const { setIsAuthenticated,
        setAuthenticatedUser,
        setAuthTokens,
        setIsConfirmed
    } = useAuth();
    const { setLoading } = useLoading();
    const { showMessage } = useMessage();

    const signIn = useCallback((signInProps: SignInProps) => {
        setLoading(true);
        ApiBaseUrl
            .post<SignInProps, AxiosResponse<ApiData>>('/auth/sign_in', signInProps)
            .then(result => {
                if(result.status===200) {
                    setIsAuthenticated(true);
                    setAuthenticatedUser(result.data.data);

                    const accessToken = result.headers["access-token"];
                    const client = result.headers["client"];
                    const uid = result.headers["uid"]

                    Cookies.set("_access_token", accessToken);
                    Cookies.set("_client", client);
                    Cookies.set("_uid", uid);

                    setAuthTokens({
                        'access-token': accessToken,
                        client: client,
                        uid: uid
                    });

                    setIsConfirmed(true);

                    showMessage({
                        message: "Sign In Success!",
                        type: "success"
                    });
                }
            })
            .catch(() => {
                setIsAuthenticated(false);
                showMessage({
                    message: "You could not sign in!",
                    type: "error"
                });
            })
            .finally(() => setLoading(false));
    }, []);

    

    return { signIn };
};
