import { memo, VFC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { SignUpButton } from "components/atoms/button/SignUpButton";
import { BaseInput } from "components/atoms/input/BaseInput";
import { Validation } from "components/atoms/message/Validation";
import { SignUpProps } from "types/signUpProps";

type Props = {
    onClick: (signUpProps: SignUpProps) => void;
}

export const SignUpForm:VFC<Props> = memo((props) => {
    const { onClick } = props;

    const schema = yup.object().shape({
        name: yup.string()
            .required('Name is required!')
            .max(16, 'Password must be at less 16 characters!'),
        email: yup.string()
            .email('Email must be a valid email!')
            .required('Email is required!'),
        password: yup.string()
            .required('Password is required!')
            .min(6, 'Password must be at least 6 characters!'),
        password_confirmation: yup.string()
            .required('Confirm Password is required!')
            .oneOf([yup.ref('password')], 'Passwords must match!'),
    }).required();

    const {
        register,
        handleSubmit,
        getValues,
        formState,
    } = useForm<SignUpProps>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema)
    });

    const {
        errors,
        isDirty,
        isValid,
        isSubmitting,
        // touchedFields
    } = formState;

    const onSubmit: SubmitHandler<SignUpProps> = (data) => {
        // alert(JSON.stringify(data));
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <StyledContainer>
                <StyledHeader>
                    SIGN UP
                </StyledHeader>
                <StyledLabelWrapper>
                    Name
                </StyledLabelWrapper>
                <StyledInput
                    placeholder="Input your name"
                    {...register('name')} />
                    <Validation>{errors.name?.message}</Validation>
                <StyledLabelWrapper>
                    Email
                </StyledLabelWrapper>
                <StyledInput
                    placeholder="Input your email"
                    {...register('email')} />
                    <Validation>{errors.email?.message}</Validation>
                <StyledLabelWrapper>
                    Password
                </StyledLabelWrapper>
                <StyledInput
                    type="password"
                    placeholder="Input your password"
                    {...register('password')} />
                    <Validation>{errors.password?.message}</Validation>
                <StyledLabelWrapper>
                    Confirm Password
                </StyledLabelWrapper>
                <StyledInput
                    type="password"
                    placeholder="Input your password again for confirmation"
                    {...register('password_confirmation')} />
                    <Validation>{errors.password_confirmation?.message}</Validation>
                <StyledButtonWrapper>
                    <SignUpButton
                        disabled={!isDirty || !isValid || isSubmitting}
                        onClick={() => {
                            const values = getValues();
                            onClick(values);
                        }}
                    >
                        SIGN UP
                    </SignUpButton>
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
    padding: 24px;
    margin: 24px;
`
const StyledHeader = styled.h2`
    text-align: center;
    color: #333;
    width: 480px;
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