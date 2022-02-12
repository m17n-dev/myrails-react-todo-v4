/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

import ApiBaseUrl from "api/ApiBaseUrl";
import { AuthTokenHeaderProps } from "types/authTokenHeaderProps";
import { User } from "types/api/user";
import { useAuth } from "hooks/user/useAuth";
import { useLoading } from "hooks/useLoading";

type ApiData = {
    is_signed_in: boolean;
    data: User;
    is_confirmed: boolean;
};

export const useAuthSession = () => {
    const { isAuthenticated,
        setIsAuthenticated,
        setAuthenticatedUser,
        setAuthTokens,
        setIsConfirmed
    } = useAuth();
    const { setLoading } = useLoading();

    const authSession = useCallback((authTokenHeaderProps: AuthTokenHeaderProps) => {
        // console.log('authSession');
        setLoading(true);
        ApiBaseUrl
            .get<AuthTokenHeaderProps, AxiosResponse<ApiData>>('/auth/sessions', { headers: authTokenHeaderProps })
            .then(result => {
                if(result.data.is_signed_in===true
                && result.data.is_confirmed===true) {
                    setIsAuthenticated(true);
                    setAuthenticatedUser(result.data.data);
                    setAuthTokens(authTokenHeaderProps);
                    setIsConfirmed(result.data.is_confirmed);
                }
            })
            .catch(() => {
                setIsAuthenticated(false);
                setAuthenticatedUser(undefined);

                Cookies.remove("_access_token");
                Cookies.remove("_client");
                Cookies.remove("_uid");

                setAuthTokens({
                    'access-token': undefined,
                    client: undefined,
                    uid: undefined
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return { authSession, isAuthenticated };
};
