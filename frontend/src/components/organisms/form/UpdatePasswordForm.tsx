import { memo, VFC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { UpdateButton } from "components/atoms/button/UpdateButton";
import { BaseInput } from "components/atoms/input/BaseInput";
import { Validation } from "components/atoms/message/Validation";
import { UpdatePasswordProps } from "types/updatePasswordProps";
import { AuthTokenHeaderProps } from "types/authTokenHeaderProps";
import { useAuth } from "hooks/user/useAuth";

type Props = {
    onClick: (updatePasswordProps: UpdatePasswordProps, authTokenHeaderProps: AuthTokenHeaderProps) => void;
}

export const UpdatePasswordForm:VFC<Props> = memo((props) => {
    const { onClick } = props;

    const { authTokens } = useAuth();
    const schema = yup.object().shape({
        current_password: yup.string()
            .required('Current password is required!')
            .min(6, 'Current password must be at least 6 characters!'),
        password: yup.string()
            .required('Password is required!')
            .min(6, 'Password must be at least 6 characters!'),
        password_confirmation: yup.string()
            .required('Confirm password is required!')
            .oneOf([yup.ref('password')], 'Passwords must match!'),
    }).required();

    const {
        register,
        handleSubmit,
        getValues,
        formState,
    } = useForm<UpdatePasswordProps>({
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

    const onSubmit: SubmitHandler<UpdatePasswordProps> = (data) => {
        // alert(JSON.stringify(data));
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <StyledContainer>
                <StyledLabelWrapper>
                    Current Password
                </StyledLabelWrapper>
                <StyledInput
                    type="password"
                    placeholder="Input your current password"
                    {...register('current_password')} />
                    <Validation>{errors.current_password?.message}</Validation>
                <StyledLabelWrapper>
                    New Password
                </StyledLabelWrapper>
                <StyledInput
                    type="password"
                    placeholder="Input your new password"
                    {...register('password')} />
                    <Validation>{errors.password?.message}</Validation>
                <StyledLabelWrapper>
                    Confirm New Password
                </StyledLabelWrapper>
                <StyledInput
                    type="password"
                    placeholder="Input your new password again for confirmation"
                    {...register('password_confirmation')} />
                    <Validation>{errors.password_confirmation?.message}</Validation>
                <StyledButtonWrapper>
                    <UpdateButton
                        disabled={!isDirty || !isValid || isSubmitting}
                        onClick={() => {
                            const values = getValues();
                            // console.log('values:', values);
                            onClick(values, authTokens!);
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