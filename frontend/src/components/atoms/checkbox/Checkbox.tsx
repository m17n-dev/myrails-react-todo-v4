import { ChangeEvent, memo, VFC } from "react";
import styled from "styled-components";

interface BaseProps {
    id?: string;
    value?: string;
    onChange?(e: ChangeEvent<HTMLInputElement>): void;
}
  
interface ControlledProps extends BaseProps {
    checked?: boolean;
    defaultChecked?: never;
}
  
interface UncontrolledProps extends BaseProps {
    checked?: never;
    defaultChecked?: boolean;
}
  
type Props = ControlledProps | UncontrolledProps;

export const Checkbox:VFC<Props> = memo((props) => {
    const { id, value, checked, defaultChecked, onChange } = props;
    return (
        <>
            <StyledCheckbox
                type="checkbox"
                id={id}
                value={value}
                checked={checked}
                defaultChecked={defaultChecked}
                onChange={onChange}
            />
        </>);
});

const StyledCheckbox = styled.input`
    box-sizing: border-box;
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin-right: 5px;
`