import { memo, VFC } from "react";
import { Route, Switch, RouteProps } from "react-router-dom";

import { PageNotFound } from "components/pages/PageNotFound";
import { PageTop } from "components/pages/PageTop";
import { PublicRoute } from "router/PublicRoute"
import { PrivateRoute } from "router/PrivateRoute";
import { useGetToken } from "hooks/user/useGetToken";
import { PageSignIn } from "components/pages/PageSignIn";
import { PageSignUp } from "components/pages/PageSignUp";
import { PageForgot } from "components/pages/PageForgot";
import { PageTodo } from "components/pages/PageTodo";
import { PageSetting } from "components/pages/PageSetting";
import { PageHealthCheck } from "components/pages/PageHealthCheck";
import { TodosProvider } from "providers/TodosProvider";
import { PageResetPassword } from "components/pages/PageResetPassword";

export type PublicRouteProps = {
    isAuthenticated: boolean;
    redirectPath: string;
} & RouteProps;

export type PrivateRouteProps = {
    isAuthenticated: boolean;
    redirectPath: string;
} & RouteProps;

export const Router: VFC = memo(() => {
    const { isAuthenticated } = useGetToken();
    
    const defaultPublicRouteProps: PublicRouteProps = {
        isAuthenticated: isAuthenticated,
        redirectPath: '/todo',
    };

    const defaultPrivateRouteProps: PrivateRouteProps = {
        isAuthenticated: isAuthenticated,
        redirectPath: '/sign_in',
    };

    return (
        <TodosProvider>
            <Switch>
                <PublicRoute
                    {...defaultPublicRouteProps}
                    exact
                    path="/"
                    sensitive
                >
                    <PageTop />
                </PublicRoute>
                <PublicRoute
                    {...defaultPublicRouteProps}
                    exact
                    path="/sign_in"
                    sensitive
                >
                    <PageSignIn />
                </PublicRoute>
                <PublicRoute
                    {...defaultPublicRouteProps}
                    exact
                    path="/sign_up"
                    sensitive
                >
                    <PageSignUp />
                </PublicRoute>
                <PublicRoute
                    {...defaultPublicRouteProps}
                    exact
                    path="/user/forgot"
                    sensitive
                >
                    <PageForgot />
                </PublicRoute>
                <PublicRoute
                    {...defaultPublicRouteProps}
                    exact
                    path="/user/reset_password"
                    sensitive
                >
                    <PageResetPassword />
                </PublicRoute>
                <PrivateRoute
                    {...defaultPrivateRouteProps}
                    exact
                    path="/todo"
                    sensitive
                >
                    <PageTodo />
                </PrivateRoute>
                <PrivateRoute
                    {...defaultPrivateRouteProps}
                    exact
                    path="/user/settings"
                    sensitive
                >
                    <PageSetting />
                </PrivateRoute>
                <Route path="/health_check">
                    <PageHealthCheck />
                </Route>
                <Route path="*">
                    <PageNotFound />
                </Route>
            </Switch>
        </TodosProvider>
    );
});