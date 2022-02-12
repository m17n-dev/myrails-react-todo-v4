import { memo, ReactNode, VFC } from "react"
import styled from "styled-components";

import { BaseButton } from "components/atoms/button/BaseButton";

type Props = {
    children: ReactNode;
    onClick: () => void;
}

export const SecondaryButton:VFC<Props> = memo((props) => {
    const { children, onClick } = props;
    return (
        <StyledButton
            type="button"
            onClick={onClick}
        >
            {children}
        </StyledButton>
    );
});

const StyledButton = styled(BaseButton)`
    background-color: #11999e;
    padding: 5px 10px;
    margin: 1px 3px;
`