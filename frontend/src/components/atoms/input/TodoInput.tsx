import { ChangeEvent, memo, VFC } from "react";
import styled from "styled-components";
import { BaseInput } from "components/atoms/input/BaseInput";

type Props = {
    type: "text";
    placeholder?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TodoInput:VFC<Props> = memo((props) => {
    const { type, placeholder, value, onChange } = props;
    return (
        <>
            <StyledInput
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>);
});

const StyledInput = styled(BaseInput)`
    width: 360px;
`