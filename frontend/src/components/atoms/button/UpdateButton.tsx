import { memo, ReactNode, VFC } from "react"
import styled from "styled-components";

import { BaseButton } from "components/atoms/button/BaseButton";

type Props = {
    children: ReactNode;
    disabled?: boolean;
    onClick: () => void;
}

export const UpdateButton:VFC<Props> = memo((props) => {
    const { children, disabled, onClick } = props;
    return (
        <StyledButton
            type="button"
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </StyledButton>
    );
});

const StyledButton = styled(BaseButton)`
    background-color: #11999e;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: bold;
    width: 480px;
`