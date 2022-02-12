import { memo, VFC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useLocation } from "react-router-dom";

import { UpdateButton } from "components/atoms/button/UpdateButton";
import { BaseInput } from "components/atoms/input/BaseInput";
import { Validation } from "components/atoms/message/Validation";
import { ResetPasswordProps } from "types/resetPasswordProps";

type Props = {
    onClick: (resetPasswordProps: ResetPasswordProps) => void;
}

export const ResetPasswordForm:VFC<Props> = memo((props) => {
    const { onClick } = props;

    const search = useLocation().search;
    const query = new URLSearchParams(search);
    // console.log('location:', query.get('reset_password_token'));

    const schema = yup.object().shape({
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
    } = useForm<ResetPasswordProps>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: { reset_password_token: query.get('reset_password_token')! }
    });

    const {
        errors,
        isDirty,
        isValid,
        isSubmitting,
        // touchedFields
    } = formState;

    const onSubmit: SubmitHandler<ResetPasswordProps> = (data) => {
        // alert(JSON.stringify(data));
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <StyledContainer>
                <StyledHeader>
                    RESET PASSWORD
                </StyledHeader>
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
                    <UpdateButton
                        disabled={!isDirty || !isValid || isSubmitting}
                        onClick={() => {
                            const values = getValues();
                            // console.log('values:', values);
                            onClick(values);
                        }}
                    >
                        UPDATE
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