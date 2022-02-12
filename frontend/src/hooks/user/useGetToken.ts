import Cookies from "js-cookie";
import { useEffect } from "react";

import { useAuthSession } from "hooks/user/useAuthSession";

export const useGetToken = () => {
    const { authSession, isAuthenticated } = useAuthSession();

    useEffect(() => {
        const accessToken = Cookies.get('_access_token');
        const client = Cookies.get('_client');
        const uid = Cookies.get('_uid');

        // console.log('accessToken:', accessToken);
        // console.log('client:', client);
        // console.log('uid:', uid);

        if (accessToken !== undefined
            && accessToken !== null
            && client !== undefined
            && client !== null
            && uid !== undefined
            && uid !== null) {
                authSession({
                    'access-token': accessToken,
                    client: client,
                    uid: uid
                });
        }
    }, [authSession]);

    return { isAuthenticated };
}