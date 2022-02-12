import { memo, VFC } from "react";
import styled from "styled-components";

import { DefaultLayout } from "components/templates/DefaultLayout";

export const PageNotFound: VFC = memo(() => {
    return (
        <DefaultLayout>
            <StyledContainer>
                <p>Not Found Page</p>
            </StyledContainer>
        </DefaultLayout>
    )
});

const StyledContainer = styled.div`
    padding: 24px;
`