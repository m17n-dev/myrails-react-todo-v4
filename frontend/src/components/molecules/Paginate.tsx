import { memo, VFC } from "react";
import styled from "styled-components"

import { PaginationButton } from "components/atoms/button/PaginationButton";

type Props = {
    currentPageNumber: number;
    totalPages: number;
    onClickPage: (pageNumber: number) => void;
}

export const Paginate:VFC<Props> = memo((props) => {
    const { currentPageNumber, totalPages, onClickPage } = props;
    const pages = [...Array(totalPages).keys()].map((number) => number + 1);
    // [1, 2, 3, 4, 5]

    return (
        <StyledContainer>
            {
                pages.map((pageNumber) => (
                    <PaginationButton
                        key={pageNumber}
                        pageNumber={pageNumber}
                        clickNumber={currentPageNumber}
                        onClick={() => onClickPage(pageNumber)}
                    >
                        {pageNumber}
                    </PaginationButton>
                  ))
            }
        </StyledContainer>
    );
});

const StyledContainer = styled.div`
    padding: 24px 15px;
`