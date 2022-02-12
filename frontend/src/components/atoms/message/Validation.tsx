import { memo, ReactNode, VFC } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
}

export const Validation:VFC<Props> = memo((props) => {
    const { children } = props;
    return(
        <StyledValidation>
            {children}
        </StyledValidation>
    )
});

const StyledValidation = styled.div`
    color: red;
    margin-top: 4px;
    margin-left: 24px;
    font-size: 14px;
`