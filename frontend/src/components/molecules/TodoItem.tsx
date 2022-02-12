import { ChangeEvent, memo, VFC } from "react";
import styled from "styled-components"

import { SecondaryButton } from "components/atoms/button/SecondaryButton";
import { Checkbox } from "components/atoms/checkbox/Checkbox";

type Props = {
    id: number;
    checked?: boolean;
    title: string;
    onChangeDone: (event: ChangeEvent<HTMLInputElement>) => void;
    onClickDelete: (id: number) => void;
    onClickEditOpen: (id: number) => void;
}

export const TodoItem:VFC<Props> = memo((props) => {
    const { id, checked, title, onChangeDone, onClickDelete, onClickEditOpen } = props;

    return (
        <StyledContainer>
            <Checkbox
                id={id.toString()}
                value={title}
                checked={checked}
                onChange={onChangeDone}
            />
            {title}
            <StyledButtonWrapper>
                <SecondaryButton
                    onClick={() => onClickDelete(id!)}>
                        DELETE
                </SecondaryButton>
                <SecondaryButton
                    onClick={() => onClickEditOpen(id!)}>
                        EDIT
                </SecondaryButton>
            </StyledButtonWrapper>
        </StyledContainer>
    );
});

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 7px 15px;
`
const StyledButtonWrapper = styled.div`
    padding-left: 36px;
`