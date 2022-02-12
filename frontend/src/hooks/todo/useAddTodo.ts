/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { AxiosResponse } from "axios";

import ApiBaseUrl from "api/ApiBaseUrl";
import { useLoading } from "hooks/useLoading";
import { useMessage } from "hooks/useMessage";
import { AuthTokenHeaderProps } from "types/authTokenHeaderProps";
import { useTodos } from "hooks/todo/useTodos";
import { Todo } from "types/api/todo";
import { TODO_PER_PAGE } from "constants/constants";

type Props = {
    todoTitle: Todo;
    authTokenHeaderProps: AuthTokenHeaderProps;
    initialTodos: Todo[];
};

type ApiData = {
    todo: Todo;
};

export const useAddTodo = () => {
    const { setLoading } = useLoading();
    const { setTodos, setTotalPages } = useTodos();
    const { showMessage } = useMessage();
    
    const addTodo = useCallback((props: Props) => {
        const { todoTitle, authTokenHeaderProps, initialTodos } = props;
        setLoading(true);
        ApiBaseUrl
            .post<Todo, AxiosResponse<ApiData>>('/todos', todoTitle, { headers: authTokenHeaderProps })
            .then(result => {
                if(result.status === 200){
                    // console.log('initialTodos', initialTodos);
                    // console.log('result.data.todo', result.data.todo);
                    let newTodos = [...initialTodos, result.data.todo]
                    setTodos(newTodos);
                    setTotalPages(Math.ceil(newTodos.length / TODO_PER_PAGE));
                }
            })
            .catch(() =>
                showMessage({
                    message: "Failed to post todo data",
                    type: "error"
                })
            )
            .finally(() => setLoading(false));
    }, [setTodos, setTotalPages]);
    
    return { addTodo };
};