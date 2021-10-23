import Link from "next/link";
import React, { useState } from "react";
import { Formik } from "formik";
import { getResetPasswordValidationSchema } from "utils/formValidation";
import { useResetPasswordMutation } from "generated/graphql";
import { ErrorMsg, Input, Error, SuccessMsg } from "../../Input";
import Button from "../Button";

import {
  RPContainer,
  FormWrap,
  MainContainer,
  HeaderText,
  InputContainer,
  ButtonContainer,
  HorizontalRule,
  BackToLogin,
} from "./passwordreset.styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";


const initialValues = {
  newPassword: "",
  confirmPassword: "",
  error: "",
  success: "",
};
const ResetPassword = () => {
  const router = useRouter();
  const [resetPassword] = useResetPasswordMutation();
  const [errorMsg, setErrorMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = async ({ ...values }: any) => {
    console.log(values);

    try {
      const response = await resetPassword({
        variables: {
          newPassword: values.newPassword,
          token:
            typeof router.query.token === "string" ? router.query.token : "",
        },
      });
      if (!response.data?.resetPassword.includes("successfully")) {
        const msg: any = response.data?.resetPassword;
        initialValues.error = msg;
        setErrorMsg(true);
        toast.error(msg);
      } else {
        const msg: any = response.data?.resetPassword;
        initialValues.success = msg;
        setSuccessMsg(true);
        toast.success(msg);
        setTimeout(() => {
          router.push("/signin");
        }, 3000);
      }
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  };
  return (
    <>
      <RPContainer>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={getResetPasswordValidationSchema}
        >
          {({ isSubmitting, errors, touched }) => (
            <FormWrap>
              <MainContainer>
                <HeaderText>reset password</HeaderText>
                {errorMsg && <ErrorMsg>{initialValues.error}</ErrorMsg>}
                {successMsg && <SuccessMsg>{initialValues.success}</SuccessMsg>}
                <InputContainer>
                  <Input
                    type="password"
                    placeholder="New Password"
                    name="newPassword"
                  />
                  {errors.newPassword && touched.newPassword && (
                    <Error>{errors.newPassword}</Error>
                  )}
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Error>{errors.confirmPassword}</Error>
                  )}
                </InputContainer>
                <ButtonContainer>
                  <Button
                    type="submit"
                    content="submit"
                    disabled={isSubmitting}
                  />
                </ButtonContainer>
                <HorizontalRule />
                <Link href="/signin">
                  <BackToLogin>back to login?</BackToLogin>
                </Link>
              </MainContainer>
            </FormWrap>
          )}
        </Formik>
      </RPContainer>
      <ToastContainer />
    </>
  );
};

export default ResetPassword;
