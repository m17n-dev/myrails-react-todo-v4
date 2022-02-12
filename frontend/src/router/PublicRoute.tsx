import { memo, ReactNode, VFC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

type Props = {
    children: ReactNode;
    isAuthenticated: boolean;
    redirectPath: string;
} & RouteProps;

export const PublicRoute: VFC<Props> = memo((props) => {
    const { children, isAuthenticated, redirectPath, ...routeProps } = props;
    return (
        <Route
            {...routeProps}
            render={({ location }) => (
                !isAuthenticated
                    ? (children)
                    : (
                        <Redirect to={{
                            pathname: redirectPath,
                            state: { from: location }}
                        }/>
                      )
            )}
        />
    );
});