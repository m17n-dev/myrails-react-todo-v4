import { memo, ReactNode, VFC } from "react"
import styled from "styled-components";

import { BaseButton } from "components/atoms/button/BaseButton";

type Props = {
    children: ReactNode;
    disabled?: boolean;
    onClick: () => void;
}

export const PrimaryButton:VFC<Props> = memo((props) => {
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
    background-color: #40514e;
`