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
    todo?: Todo;
    authTokenHeaderProps: AuthTokenHeaderProps;
    initialTodos: Todo[];
};

type ApiData = {
    todo: Todo;
};

export const useEditTodo = () => {
    const { setLoading } = useLoading();
    const { setTodos, setTotalPages } = useTodos();
    const { showMessage } = useMessage();

    const editTodo = useCallback((props: Props) => {
        const { todo, authTokenHeaderProps, initialTodos } = props;
        setLoading(true);
        ApiBaseUrl
            .patch<Todo, AxiosResponse<ApiData>>(`/todos/${todo?.id}`, todo, { headers: authTokenHeaderProps })
            .then(result => {
                if(result.status === 200){
                    // console.log('initialTodos', initialTodos);
                    // console.log('result.data.todo', result.data.todo);
                    let newTodos = initialTodos.map(todo => (todo.id === result.data.todo.id ? { ...todo, title: result.data.todo.title, done: result.data.todo.done } : todo));
                    setTodos(newTodos);
                    setTotalPages(Math.ceil(newTodos.length / TODO_PER_PAGE));
                }
            })
            .catch(() =>
                showMessage({
                    message: "Failed to edit todo data",
                    type: "error"
                })
            )
            .finally(() => setLoading(false));
    }, []);

    return { editTodo };
};