import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState
} from "react";
import { User } from "types/api/user";
import { AuthTokenHeaderProps } from "types/authTokenHeaderProps";

type AuthenticatedUser = User;
type AuthTokens = AuthTokenHeaderProps;

export type AuthContextType = {
    authenticatedUser: AuthenticatedUser | undefined;
    setAuthenticatedUser: Dispatch<SetStateAction<AuthenticatedUser | undefined>>;
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    authTokens: AuthTokens | undefined;
    setAuthTokens: Dispatch<SetStateAction<AuthTokens | undefined>>;
    isConfirmed: boolean;
    setIsConfirmed: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

export const AuthProvider = (props: { children: ReactNode }) => {
    const { children } = props;
    const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | undefined>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authTokens, setAuthTokens] = useState<AuthTokens | undefined>(undefined);
    const [isConfirmed, setIsConfirmed] = useState(false);
    return (
        <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser, isAuthenticated, setIsAuthenticated, authTokens, setAuthTokens, isConfirmed, setIsConfirmed }}>
            {children}
        </AuthContext.Provider>
    );
};
  