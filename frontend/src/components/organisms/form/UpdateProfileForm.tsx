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

export const UpdateProfileForm:VFC<Props> = memo((props) => {
    const { user, onClick } = props;

    const { authTokens } = useAuth();
    const schema = yup.object().shape({
        name: yup.string()
            .required('Name is required!')
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
        defaultValues: { name: user.name }
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
                    Name
                </StyledLabelWrapper>
                <StyledInput
                    placeholder="Input your name"
                    {...register('name')} />
                    <Validation>{errors.name?.message}</Validation>
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