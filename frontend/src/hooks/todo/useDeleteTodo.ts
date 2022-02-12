/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { AxiosResponse } from "axios";

import { Todo } from "types/api/todo";
import ApiBaseUrl from "api/ApiBaseUrl";
import { useLoading } from "hooks/useLoading";
import { useMessage } from "hooks/useMessage";
import { AuthTokenHeaderProps } from "types/authTokenHeaderProps";
import { useTodos } from "hooks/todo/useTodos";
import { TODO_PER_PAGE } from "constants/constants";

type Props = {
    id: number;
    authTokenHeaderProps: AuthTokenHeaderProps;
    initialTodos: Todo[];
};

type ApiData = {
    todo: Todo;
};

export const useDeleteTodo = () => {
    const { setLoading } = useLoading();
    const { setTodos, setTotalPages } = useTodos();
    const { showMessage } = useMessage();

    const deleteTodo = useCallback((props: Props) => {
        const { id, authTokenHeaderProps, initialTodos } = props;
        setLoading(true);
        ApiBaseUrl
            .delete<Todo, AxiosResponse<ApiData>>(`/todos/${id}`, { headers: authTokenHeaderProps })
            .then(result => {
                if(result.status === 200){
                    // console.log('initialTodos', initialTodos);
                    // console.log('result.data.todo', result.data.todo);
                    let newTodos = initialTodos.filter(todo => todo.id !== id);
                    setTodos(newTodos);
                    setTotalPages(Math.ceil(newTodos.length / TODO_PER_PAGE));
                }
            })
            .catch(() =>
                showMessage({
                    message: "Failed to delete todo data",
                    type: "error"
                })
            )
            .finally(() => setLoading(false));
    }, []);

    return { deleteTodo };
};