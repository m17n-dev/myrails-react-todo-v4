import { ChangeEvent, memo, useCallback, useState, VFC } from "react";
import styled from "styled-components";

import { Todo } from "types/api/todo";
import { PrimaryButton } from "components/atoms/button/PrimaryButton";
import { Checkbox } from "components/atoms/checkbox/Checkbox";
import { TodoInput } from "components/atoms/input/TodoInput";

type Props = {
    todoId: number;
    todoDone?: boolean;
    todoTitle: string;
    onClick: (todo: Todo) => void;
    onClose: () => void;
}

export const EditTodo:VFC<Props> = memo((props) => {
    const { todoId, todoDone, todoTitle, onClick, onClose } = props;

    const [ todoDoneEdit, setTodoDoneEdit ] = useState<boolean | undefined>(todoDone);
    const [ todoTitleEdit, setTodoTitleEdit ] = useState<string>(todoTitle);


    const onChangeDone = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTodoDoneEdit(e.target.checked);
    },[setTodoDoneEdit]);
    
    const onChangeTodoTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTodoTitleEdit(e.target.value);
    },[setTodoTitleEdit]);

    return (
        <StyledContainer>
            <Checkbox
                id={todoId.toString()}
                checked={todoDoneEdit}
                onChange={onChangeDone}
            />
            <TodoInput
                type="text"
                value={todoTitleEdit}
                onChange={onChangeTodoTitle}
            />
            <StyledButtonWrapper>
                <PrimaryButton
                    disabled={!todoTitleEdit}
                    onClick={() => onClick({
                        id: todoId,
                        title: todoTitleEdit,
                        done: todoDoneEdit
                    })}
                >
                    EDIT
                </PrimaryButton>
            </StyledButtonWrapper>
            <StyledButtonWrapper>
                <PrimaryButton
                    onClick={() => onClose()}
                >
                    CANCEL
                </PrimaryButton>
            </StyledButtonWrapper>
        </StyledContainer>
    )
});

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
`
const StyledButtonWrapper = styled.div`
    padding-left: 8px;
`