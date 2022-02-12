import { useContext } from "react";

import {
    AuthContext,
    AuthContextType
} from "providers/AuthProvider";

export const useAuth = (): AuthContextType => useContext(AuthContext);
