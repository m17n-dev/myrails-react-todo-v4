import { useContext } from "react";

import {
    TodosContext,
    TodosContextType
} from "providers/TodosProvider";

export const useTodos = (): TodosContextType =>
    useContext(TodosContext);
