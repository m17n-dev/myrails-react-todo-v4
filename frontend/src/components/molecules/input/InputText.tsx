import { ChangeEvent, memo, VFC } from "react";
import styled from "styled-components";

import { Todo } from "types/api/todo";
import { PrimaryButton } from "components/atoms/button/PrimaryButton";
import { TodoInput } from "components/atoms/input/TodoInput";


type Props = {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onClick: (todoTitle: Todo) => void;
}

export const InputText:VFC<Props> = memo((props) => {
    const { value, onChange, onClick } = props;
    return (
        <StyledContainer>
            <TodoInput
                type="text"
                placeholder="Input todo name"
                value={value}
                onChange={onChange}
            />
            <StyledButtonWrapper>
                <PrimaryButton
                    disabled={!value}
                    onClick={() => onClick({title: value})}
                >
                    ADD
                </PrimaryButton>
            </StyledButtonWrapper>
        </StyledContainer>
    )
});

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 24px;
`
const StyledButtonWrapper = styled.div`
    padding-left: 8px;
`