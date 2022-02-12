import { ChangeEvent, memo, VFC } from "react";

import { TODO_PER_PAGE } from "constants/constants";
import { Todo } from "types/api/todo";
import { TodoItem } from "components/molecules/TodoItem";

type Props = {
    todos: Array<Todo>;
    currentPageNumber: number;
    onChangeDone: (event: ChangeEvent<HTMLInputElement>) => void;
    onClickDelete: (id: number) => void;
    onClickEditOpen: (id: number) => void;
}

export const TodoList:VFC<Props> = memo((props) => {
    const { todos, currentPageNumber, onChangeDone, onClickDelete, onClickEditOpen } = props;

    const startIndex = ( currentPageNumber - 1 ) * TODO_PER_PAGE;
    const selectedTodos = todos.slice(startIndex, startIndex + TODO_PER_PAGE);
    
    return (
        <>
            {selectedTodos.map((todo) => (
                <TodoItem
                    key={todo.id!}
                    id={todo.id!}
                    checked={todo.done}
                    title={todo.title!}
                    onChangeDone={onChangeDone}
                    onClickDelete={onClickDelete}
                    onClickEditOpen={onClickEditOpen}
                />
            ))}
        </>
    );
});