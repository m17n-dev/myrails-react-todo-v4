//
// The code below is not used this time
//
import { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";

import { authenticatedRoutes } from "router/AuthenticatedRoutes";

export const ProtectedRoutes: VFC = memo(() => {
    return(
        <Switch>
            {authenticatedRoutes.map((route) => (
                <Route
                    key={route.path}
                    exact={route.exact}
                    path={route.path}
                    sensitive={route.sensitive}
                >
                    {route.children}
                </Route>
              ))}
        </Switch>
    )
});