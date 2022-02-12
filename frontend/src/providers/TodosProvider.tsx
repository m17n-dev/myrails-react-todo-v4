import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState
} from "react";

import { Todo } from "types/api/todo";

export type TodosContextType = {
    todos: Todo[];
    setTodos: Dispatch<SetStateAction<Todo[]>>;
    totalPages: number;
    setTotalPages: Dispatch<SetStateAction<number>>;
};

export const TodosContext = createContext<TodosContextType>(
    {} as TodosContextType
);

export const TodosProvider = (props: { children: ReactNode }) => {
    const { children } = props;
    const [todos, setTodos] = useState<Todo[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    return (
        <TodosContext.Provider value={{ todos, setTodos, totalPages, setTotalPages }}>
            {children}
        </TodosContext.Provider>
    );
};
  