//
// The code below is not used this time
//
import { PageSetting } from "components/pages/PageSetting";
import { PageTodo } from "components/pages/PageTodo";

export const authenticatedRoutes = [
    {
        exact: true,
        path: '/todo',
        sensitive: true,
        children: <PageTodo />
    },
    {
        exact: true,
        path: '/user/settings',
        sensitive: true,
        children: <PageSetting />
    }
];