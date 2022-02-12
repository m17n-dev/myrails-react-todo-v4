import { memo, VFC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { UpdateButton } from "components/atoms/button/UpdateButton";
import { BaseInput } from "components/atoms/input/BaseInput";
import { Validation } from "components/atoms/message/Validation";
import { User } from "types/api/user";
import { AuthTokenHeaderProps } from "types/authTokenHeaderProps";
import { useAuth } from "hooks/user/useAuth";

type Props = {
    user: User;
    onClick: (user: User, authTokenHeaderProps: AuthTokenHeaderProps) => void;
}

export const UpdateEmailForm:VFC<Props> = memo((props) => {
    const { user, onClick } = props;

    const { authTokens } = useAuth();
    const schema = yup.object().shape({
        email: yup.string()
            .email('Email must be a valid email!')
            .required('Email is required!'),
    }).required();

    const {
        register,
        handleSubmit,
        getValues,
        formState,
    } = useForm<User>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: { email: user.email }
    });

    const {
        errors,
        isDirty,
        isValid,
        isSubmitting,
        // touchedFields
    } = formState;

    const onSubmit: SubmitHandler<User> = (data) => {
        // alert(JSON.stringify(data));
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <StyledContainer>
                <StyledLabelWrapper>
                    Email
                </StyledLabelWrapper>
                <StyledInput
                    placeholder="Input your email"
                    {...register('email')} />
                    <Validation>{errors.email?.message}</Validation>
                <StyledButtonWrapper>
                    <UpdateButton
                        disabled={!isDirty || !isValid || isSubmitting}
                        onClick={() => {
                            const values = getValues();
                            // console.log('values:', values);
                            onClick(values, authTokens!);
                        }}
                    >
                        SEND YOUR CHANGE EMAIL
                    </UpdateButton>
                </StyledButtonWrapper>
            </StyledContainer>
        </StyledForm>
    )
});

const StyledForm = styled.form`
    max-width: 500px;
    margin: 0 auto;
`
const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const StyledLabelWrapper = styled.label`
    text-align: left;
    display: block;
    margin-bottom: 13px;
    margin-top: 20px;
    margin-left: 10px;
    color: #333;
    font-size: 14px;
    font-weight: 500;
`
const StyledInput = styled(BaseInput)`
    width: 480px;
`
const StyledButtonWrapper = styled.div`
    margin-top: 24px;
`