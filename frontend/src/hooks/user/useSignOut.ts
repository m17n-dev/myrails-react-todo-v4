/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import Cookies from "js-cookie";

import ApiBaseUrl from "api/ApiBaseUrl";
import { useAuth } from "hooks/user/useAuth";
import { useLoading } from "hooks/useLoading";
import { useMessage } from "hooks/useMessage";
import { AuthTokenHeaderProps } from "types/authTokenHeaderProps";

type Props = {
    authTokenHeaderProps: AuthTokenHeaderProps;
};

export const useSignOut = () => {
    const { setIsAuthenticated, setAuthenticatedUser, setAuthTokens, setIsConfirmed } = useAuth();
    const { setLoading } = useLoading();
    const { showMessage } = useMessage();

    const signOut = useCallback((props: Props) => {
        const { authTokenHeaderProps } = props;
        setLoading(true);
        ApiBaseUrl
            .delete('/auth/sign_out', { headers: authTokenHeaderProps })
            .then(result => {
                if(result.status===200) {
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

                    setIsConfirmed(false);

                    showMessage({
                        message: "Sign Out Success!",
                        type: "success"
                    });
                }
            })
            .catch(() => {
                showMessage({
                    message: "You could not sign out!",
                    type: "error"
                });
            })
            .finally(() => setLoading(false));
    }, []);
    
    return { signOut };
};
