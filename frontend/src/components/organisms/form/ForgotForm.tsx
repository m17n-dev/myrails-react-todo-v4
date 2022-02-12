import { memo, VFC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { SignInButton } from "components/atoms/button/SignInButton";
import { Validation } from "components/atoms/message/Validation";
import { BaseInput } from "components/atoms/input/BaseInput";
import { SignInProps } from "types/signInProps";

type Props = {
    onClick: (signInProps: SignInProps) => void;
}

export const ForgotForm: VFC<Props> = memo((props) => {
    const { onClick } = props;

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
    } = useForm<SignInProps>({
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

    const onSubmit: SubmitHandler<SignInProps> = (data) => {
        // alert(JSON.stringify(data));
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <StyledContainer>
                <StyledHeader>
                    Forgot Password
                </StyledHeader>
                <StyledLabelWrapper>
                    Registered Email
                </StyledLabelWrapper>
                <StyledInput
                    placeholder="Input your registered email"
                    {...register('email')} />
                    <Validation>{errors.email?.message}</Validation>
                <StyledButtonWrapper>
                    <SignInButton
                        disabled={!isDirty || !isValid || isSubmitting}
                        onClick={() => {
                            const values = getValues();
                            onClick(values);
                        }}
                    >
                        SEND
                    </SignInButton>
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