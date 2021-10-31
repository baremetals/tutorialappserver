import React, { useState } from 'react'
import Link from "next/link";
import { Formik } from "formik";
import { getForgotPasswordValidationSchema } from "utils/formValidation";
import { useForgotPasswordMutation } from "generated/graphql";
import { ErrorMsg, Input, Error, SuccessMsg } from "../../Input";
import Button from "../Button";
import {
  MainContainer,
  WelcomeText,
  InputContainer,
  ButtonContainer,
  BackToLogin,
  PageContainer,
  FormWrap,
  HorizontalRule,
} from "../auth-styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const initialValues = {
  usernameOrEmail: "",
  error: "",
  success: "",
};
const ChangePassword = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const [errorMsg, setErrorMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSend = async ({ ...values }: any) => {
    console.log(values);
    
    try{
      const response = await forgotPassword({
        variables: {
          ...values,
        },
      })
      console.log(response.data)
      if (response.data?.forgotPassword.includes("reset link")) {
        const msg: any = response.data?.forgotPassword;
        setSuccessMsg(true);
        initialValues.success = msg;
        toast.success("Please check your email");
      } else {
        const msg: any = response.data?.forgotPassword;
        setErrorMsg(true);
        initialValues.error = msg
        toast.error(msg);
      }

    } catch (ex) {
      console.log(ex);
      throw ex
    }
  }

    return (
      <>
        <PageContainer>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSend}
            validationSchema={getForgotPasswordValidationSchema}
          >
            {({ isSubmitting, errors, touched }) => (
              <FormWrap>
                <MainContainer>
                  <WelcomeText>forgot password</WelcomeText>
                  {errorMsg && <ErrorMsg>{initialValues.error}</ErrorMsg>}
                  {successMsg && (
                    <SuccessMsg>{initialValues.success}</SuccessMsg>
                  )}
                  <InputContainer>
                    <div className="form-group">
                      <Input
                        type="text"
                        placeholder="Email or Username"
                        name="usernameOrEmail"
                        values="usernameOrEmail"
                      />
                      {errors.usernameOrEmail && touched.usernameOrEmail && (
                        <Error>{errors.usernameOrEmail}</Error>
                      )}
                    </div>
                  </InputContainer>
                  <ButtonContainer>
                    <Button
                      type="submit"
                      content="send"
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
        </PageContainer>
        <ToastContainer />
      </>
    );
}

export default ChangePassword;
