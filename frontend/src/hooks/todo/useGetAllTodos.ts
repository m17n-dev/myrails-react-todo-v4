/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { AxiosResponse } from "axios";

import { Todo } from "types/api/todo";
import ApiBaseUrl from "api/ApiBaseUrl";
import { useLoading } from "hooks/useLoading";
import { useTodos } from "hooks/todo/useTodos";
import { useMessage } from "hooks/useMessage";
import { TODO_PER_PAGE } from "constants/constants";
import { AuthTokenHeaderProps } from "types/authTokenHeaderProps";
import { useAuth } from "hooks/user/useAuth";

type ApiData = {
    todos: Todo[];
    is_confirmed: boolean;
};

export const useGetAllTodos = () => {
    console.log("useGetAllTodos");
    const { setIsConfirmed } = useAuth();
    const { setLoading } = useLoading();
    const { setTodos, setTotalPages } = useTodos();
    const { showMessage } = useMessage();

    const getAllTodos = useCallback((authTokenHeaderProps: AuthTokenHeaderProps) => {
        console.log("getAllTodos");
        console.log("authTokenHeaderProps:", authTokenHeaderProps);
        setLoading(true);
        ApiBaseUrl
            .get<Todo[], AxiosResponse<ApiData>>('/todos', { headers: authTokenHeaderProps })
            .then(result => {
                if(result.status === 200) {
                    console.log('result.data.todos', result.data.todos);
                    setTodos(result.data.todos);
                    setTotalPages(Math.ceil(result.data.todos.length / TODO_PER_PAGE));
                    setIsConfirmed(result.data.is_confirmed);
                }
            })
            .catch(() =>
                showMessage({
                    message: "Failed to get your todo data",
                    type: "error"
                })
            )
            .finally(() => setLoading(false));
    }, []);
    
    return { getAllTodos };
};
