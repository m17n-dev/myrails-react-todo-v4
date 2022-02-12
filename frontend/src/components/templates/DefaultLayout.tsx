import { memo, ReactNode, VFC } from "react";

import { Footer } from "components/atoms/layout/Footer";
import { DefaultHeader } from "components/atoms/layout/DefaultHeader";
import { AuthTokenHeaderProps } from "types/authTokenHeaderProps";
import { useAuth } from "hooks/user/useAuth";
import { AuthenticatedHeader } from "components/atoms/layout/AuthenticatedHeader";

type Props = {
    onClick?: (authTokenHeaderProps: AuthTokenHeaderProps) => void;
    children: ReactNode;
}

export const DefaultLayout:VFC<Props> = memo((props) => {
    const { onClick, children } = props;
    const { isAuthenticated } = useAuth();
    
    return(
        <>
            {!isAuthenticated &&
                <DefaultHeader />
            }
            {isAuthenticated &&
                <AuthenticatedHeader
                    onClick={onClick!}
                />
            }
                {children}
            <Footer />
        </>
    )
});
