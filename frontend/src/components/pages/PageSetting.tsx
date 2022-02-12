/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useState, VFC } from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';

import { DefaultLayout } from "components/templates/DefaultLayout";
import { UpdateProfileForm } from "components/organisms/form/UpdateProfileForm";
import { UpdateEmailForm } from "components/organisms/form/UpdateEmailForm";
import { UpdatePasswordForm } from "components/organisms/form/UpdatePasswordForm";
import { ToastContainer } from "react-toastify";
import { useLoading } from "hooks/useLoading";
import Spinner from "components/atoms/spinner/Spinner";
import { useSignOut } from "hooks/user/useSignOut";
import { useAuth } from "hooks/user/useAuth";
import { useUpdateProfile } from "hooks/user/useUpdateProfile";
import { useUpdateEmail } from "hooks/user/useUpdateEmail";
import { useUpdatePassword } from "hooks/user/useUpdatePassword";
import { UpdatePasswordProps } from "types/updatePasswordProps";
import { User } from "types/api/user";
import { AuthTokenHeaderProps } from "types/authTokenHeaderProps";

export const PageSetting: VFC = memo(() => {
    const { authenticatedUser, isConfirmed } = useAuth();
    const { loading } = useLoading();
    const { signOut } = useSignOut();
    const { updateProfile } = useUpdateProfile();
    const { updateEmail } = useUpdateEmail();
    const { updatePassword } = useUpdatePassword();
    const [tabIndex, setTabIndex] = useState(0);

    const onClickUpdateProfile = useCallback((user: User, authTokenHeaderProps: AuthTokenHeaderProps) => {
        updateProfile({user, authTokenHeaderProps});
    },[]);

    const onClickUpdateEmail = useCallback((user: User, authTokenHeaderProps: AuthTokenHeaderProps) => {
        updateEmail({user, authTokenHeaderProps});
    },[]);

    const onClickUpdatePassword = useCallback((updatePasswordProps: UpdatePasswordProps, authTokenHeaderProps: AuthTokenHeaderProps) => {
        updatePassword({updatePasswordProps, authTokenHeaderProps})
    },[]);

    const onClickSignOut = useCallback((authTokenHeaderProps: AuthTokenHeaderProps) => {
        signOut({authTokenHeaderProps});
    },[]);

    return (
        <>
            <ToastContainer />
            {loading
                ? (<Spinner />)
                : (
                    <DefaultLayout
                        onClick={onClickSignOut}
                    >
                        {isConfirmed
                            ? (
                                <StyledContainer>
                                    <StyledHeader
                                        isConfirmed={isConfirmed}
                                    >
                                        Seetings
                                    </StyledHeader>
                                    <StyledTabWrapper>
                                        <Tabs
                                            selectedIndex={tabIndex}
                                            onSelect={index => setTabIndex(index)}
                                        >
                                            <TabList>
                                                <Tab>Profile</Tab>
                                                <Tab>Email</Tab>
                                                <Tab>Password</Tab>
                                            </TabList>
                                            <TabPanel>
                                                <UpdateProfileForm
                                                    user={authenticatedUser!}
                                                    onClick={onClickUpdateProfile} />
                                            </TabPanel>
                                            <TabPanel>
                                                <UpdateEmailForm
                                                    user={authenticatedUser!}
                                                    onClick={onClickUpdateEmail} />
                                            </TabPanel>
                                            <TabPanel>
                                                <UpdatePasswordForm
                                                    onClick={onClickUpdatePassword} />
                                            </TabPanel>
                                        </Tabs>
                                    </StyledTabWrapper>
                                </StyledContainer>
                            )
                            : (
                                <StyledContainer>
                                    <StyledHeader
                                        isConfirmed={isConfirmed}
                                    >
                                        You're signed up!
                                    </StyledHeader>
                                    <h3>Now, go check your email.</h3>
                                    <h3>{authenticatedUser?.email}</h3>
                                </StyledContainer>
                            )}
                    </DefaultLayout>
                  )
            }
        </>
    )
});

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 24px;
`
const StyledHeader = styled.h2<{isConfirmed: boolean}>`
    text-align: center;
    color: ${({isConfirmed}) => isConfirmed ? '#333' : '#4CAF50' };
    margin-bottom: 48px;
`
const StyledTabWrapper = styled.div`
    width: 640px;
`