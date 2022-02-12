import { memo, ReactNode, VFC } from "react"
import styled from "styled-components";

import { BaseButton } from "components/atoms/button/BaseButton";

type Props = {
    children: ReactNode;
    pageNumber: number;
    clickNumber: number;
    onClick: () => void;
}

export const PaginationButton:VFC<Props> = memo((props) => {
    const { children, pageNumber, clickNumber, onClick } = props;
    // console.log("clickNumber: " + clickNumber);
    // console.log("pageNumber: " + pageNumber);
    return (
        <StyledButton
            type="button"
            isSelected={(clickNumber === pageNumber) ? (true) : (false)}
            onClick={onClick}
        >
            {children}
        </StyledButton>
    );
});

const StyledButton = styled(BaseButton)<{isSelected: boolean}>`
    background-color: ${({isSelected}) => isSelected ? '#11999e' : '' };
    color: ${({isSelected}) => isSelected ? '' : '#40514e' };
    padding: 5px 10px;
    margin: 1px 3px;
`
