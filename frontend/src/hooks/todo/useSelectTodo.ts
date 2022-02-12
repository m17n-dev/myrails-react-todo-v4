/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";

import { Todo } from "types/api/todo";

type Props = {
    id: number;
    todos: Array<Todo>;
};

export const useSelectTodo = () => {
    const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);
    
    const onSelectTodo = useCallback((props: Props) => {
        const { id, todos } = props;
        const targetTodo = todos.find((todo) => todo.id === id);
        // "!" means to exclude "undefined".
        setSelectedTodo(targetTodo!);
    }, []);
    
    return { onSelectTodo, selectedTodo };
};
